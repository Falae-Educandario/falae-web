require 'will_paginate/array'

class ItemsController < ApplicationController
  before_action :authenticate!
  before_action :authorized?
  before_action :set_vars
  before_action :set_item, only: %i[show edit update destroy image pdf]

  # GET /items
  # GET /items.json
  def index
    @items = @user.items
  end

  # usado na página de items do usuário
  def private
    items = @user.items.where(private: true)
    @items = items.paginate(page: params[:offset], per_page: 15)

    respond_to do |format|
      format.html { render :index, locals: { paginate: true, offset: params[:offset] } }
      format.turbo_stream { render :index, locals: { paginate: true, offset: params[:offset] } }
    end
  end

  # TODO: merge with index
  def filter
    items = @user.items.where(private: true)
    items = items.where('name LIKE ?', "%#{params[:name]}%") if params[:name]
    @items = items.paginate(page: params[:offset], per_page: 15)

    respond_to do |format|
      format.html { render partial: 'items/list', locals: { name: params[:name], paginate: true } }
      format.turbo_stream { render :index, locals: { name: params[:name], paginate: true } }
    end
  end

  # TODO: merge with index, move logic to model ...
  # GET /search
  # GET /search.json
  def search
    items = if params[:name].present?
      name = params[:name]
      private_items = @user.find_items_like_by(name: name)
      pictograms = Pictogram
        .find_like_by_and_locale(image_file_name: name, locale: I18n.locale)
      private_items + pictograms.map(&:generate_item)
    else
      []
    end

    items_paginated = items.paginate page: params[:offset], per_page: 5

    render partial: 'items/search_result', locals: {
      items: items_paginated,
    }
  end

  # GET /items/1
  # GET /items/1.json
  def show
    render partial: 'show', locals: { item: @item }
  end

  # GET /items/new
  def new
    @item = @user.items.new
    @item.image = Image.new
    render partial: 'form', locals: { item: @item }
  end

  # GET /items/1/edit
  def edit
  end


  # POST /items
  # POST /items.json
  def create
    @item = @user.items.build item_params.merge(private: true)

    if @item.save
      items = @user.items.where(private: true)
      @items = items.paginate(page: params[:offset], per_page: 15)

      respond_to do |format|
        format.html {
          render partial: 'list', locals: { paginate: false, name: params[:name] }
        }
        format.json { render :show, status: :created, location: @item }
        format.turbo_stream {
          render :index, locals: { name: params[:name], paginate: true }
        }
      end
    else
      @item.image = Image.new
      respond_to do |format|
        format.html { render :new }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /items/1
  # PATCH/PUT /items/1.json
  def update
    respond_to do |format|
      if @item.update(item_params)
        # format.html { redirect_to [@item.user, @item], notice: t('.notice') }
        format.html { render partial: 'item', locals: { item: @item } }
        format.json { render :show, status: :ok, location: @item }
      else
        format.html { render :edit }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /items/1
  # DELETE /items/1.json
  def destroy
    @item.destroy
    items = @user.items.where(private: true)
    @items = items.paginate(page: params[:offset], per_page: 15)
    respond_to do |format|
      format.html { redirect_to private_items_user_path(@user), notice: t('.notice') }
      format.json { head :no_content }
      format.turbo_stream {
        render :index, locals: { name: params[:name], paginate: true }
      }
    end
  end

  # GET image
  def image
    img = @item.image
    send_file img.image.path, filename: SecureRandom.hex[0..7],
      type: img.image_content_type, disposition: :inline
  end

  #GET pdf
  def pdf
    pdf = ItemPdf.new @item
    send_data pdf.render,
      disposition: :inline,
      filename: "#{@item.name}.pdf",
      type: 'application/pdf'
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_item
    @item = @user.items.find_by id: params[:id]
  end

  def set_vars
    @user = current_user
  end

  def item_params
    attrs = params.require(:item)
      .permit(:name, :speech, :category_id,
        image_attributes: %i[image id crop_x crop_y crop_w crop_h])
    if attrs[:image_attributes]
      attrs[:image_attributes][:user_id] = current_user.id
      attrs[:image_attributes][:locale] = current_user.locale
    end
    attrs
  end
end
