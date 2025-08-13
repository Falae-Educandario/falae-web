// truecropper@1.0.3 downloaded from https://ga.jspm.io/npm:truecropper@1.0.3/dist/truecropper.es.js

var t=Object.defineProperty;var e=(e,i,s)=>i in e?t(e,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[i]=s;var i=(t,i,s)=>e(t,typeof i!="symbol"?i+"":i,s);const s="truecropper",h={base:s,img:`${s}__image`,background:`${s}__background`,new:`${s}__new-selection`,selection:`${s}__selection`,handle:`${s}__handle`,hanleds:`${s}__handles`,valueX:`${s}X`,valueY:`${s}Y`,valueWidth:`${s}Width`,valueHeight:`${s}Height`,valueStatus:`${s}Status`,epsilon:.05},o={elementNotFound:{text:"Unable to find element",id:0},srcEmpty:{text:"Image src not provided",id:1},parentNotContainDiv:{text:"Parent element can be exists",id:2}};class v extends Error{
/**
   * Creates an instance of TrueCropperHtmlError.
   *
   * @param key - The key corresponding to a predefined error message.
   */
constructor(t){const e=o[t];super(e.text);i(this,"data");i(this,"messageId");Object.setPrototypeOf(this,v.prototype),this.name="TrueCropperHtmlError",this.data={},this.messageId=e.id}}class x extends Error{
/**
   * Creates an instance of TrueCropperImageError.
   *
   * @param message - The error message.
   * @param data - Additional data associated with the image error.
   * @param messageId - A unique identifier for the error message.
   */
constructor(t,e,s){super(t);i(this,"data");i(this,"messageId");Object.setPrototypeOf(this,x.prototype),this.name="TrueCropperImageError",this.data={target:e.target,targetCoordinates:e.coordinates?{...e.coordinates}:void 0,targetSize:{...e.targetSize},source:e.source,sourceSize:{...e.sourceSize}},this.messageId=s
/**
   * Creates a new TrueCropperImageError instance for a start size issue.
   *
   * @param target - The target element identifier.
   * @param coordinates - The coordinates related to the error.
   * @param targetSize - The dimensions of the target element.
   * @param source - The source element identifier.
   * @param sourceSize - The dimensions of the source element.
   * @returns A new instance of TrueCropperImageError.
   */}static startSize(t,e,i,s,h){const o=`The ${t} (${e.x}x${e.y}:${i.width}x${i.height}) exceeds the ${s} (${h.width}x${h.height})`,n={target:t,coordinates:e,targetSize:i,source:s,sourceSize:h};return new this(o,n,6)}
/**
   * Creates a new TrueCropperImageError instance for a size issue.
   *
   * @param target - The target element identifier.
   * @param targetSize - The dimensions of the target element.
   * @param source - The source element identifier.
   * @param sourceSize - The dimensions of the source element.
   * @returns A new instance of TrueCropperImageError.
   */static size(t,e,i,s){const h=`The ${t} (${e.width}x${e.height}) exceeds the ${i} (${s.width}x${s.height})`,o={target:t,coordinates:void 0,targetSize:e,source:i,sourceSize:s};return new this(h,o,7)}}class d extends Error{
/**
   * Creates an instance of TrueCropperOptionsError.
   *
   * @param message - The error message.
   * @param data - Additional error data.
   * @param messageId - A unique identifier for the error message.
   */
constructor(t,e,s=0){super(t);i(this,"data");i(this,"messageId");Object.setPrototypeOf(this,d.prototype),this.name="TrueCropperOptionsError",this.data=e,this.messageId=s
/**
   * Factory method for creating an options error related to aspect ratio mismatch.
   *
   * @param name - The name of the property or dimension with the aspect ratio issue.
   * @param calculatedAspectRatio - The calculated aspect ratio based on dimensions.
   * @param aspectRatio - The expected aspect ratio.
   * @param epsilon - The tolerance value for aspect ratio differences.
   * @returns A new instance of TrueCropperOptionsError with aspect ratio error details.
   */}static aspectRatio(t,e,i,s){const h=`The specified aspect ratio (${i}) and calculated ${t} dimensions (width/height = ${e}) are greater than (${s}). This might be due to a rounding error on the server side or incorrect minimum sizes.`;return new this(h,{name:t},5)}static widthIsNull(t){const e=`The width of (${t}) is null`;return new this(e,{name:t},8)}static heightIsNull(t){const e=`The height of (${t}) is null`;return new this(e,{name:t},9)}static badSizeOfPercent(t){const e=`The percent values of (${t}) > 100`;return new this(e,{name:t},10)}
/**
   * Factory method for creating a generic options error.
   *
   * @param name - The name of the option.
   * @param object - The expected or disallowed object description.
   * @param positive - If true, indicates the option must be the specified object; if false, indicates it must not be.
   * @returns A new instance of TrueCropperOptionsError with generic error details.
   */static new(t,e,i=!0){const s=i?3:4,h=i?`${t} must be ${e}`:`${t} must not be ${e}`;return new this(h,{name:t,object:e},s)}}const n=t=>{let e=null;if(typeof t=="string"){if(e=document.querySelector(t),e===null)throw new v("elementNotFound")}else e=t;if(!(e instanceof HTMLImageElement))throw new v("srcEmpty");let i=e.parentElement;if(!i)throw new v("parentNotContainDiv");return i.classList.contains(h.base)||(i=null),[e,i]},r=(t,e=void 0)=>{const i=document.createElement("div");return i.className=t,e&&e.appendChild(i),i},a=(t,e)=>{if(e.savedCoordinate<0)return{flipped:!1,coordinate:null,size:null,point:.5};const i=t<e.savedCoordinate,s=e.left!==i,h=e.savedCoordinate,o=Math.abs(e.savedCoordinate-t),n=Number(i);return{flipped:s,coordinate:h,size:o,point:n}},l=(t,e,i)=>{const s=a(t.x,e),h=a(t.y,i);return{flipped:{x:s.flipped,y:h.flipped},newBox:{coordinates:{x:s.coordinate,y:h.coordinate},size:{width:s.size,height:h.size},points:{x:s.point,y:h.point}}}},c=(t,e,i,s,h)=>{const o=(t,e,i)=>i==="relative"?t*h[e]:i==="percent"?t>=1?s[e]*(t/100):s[e]*t:t,n={width:o(e.width,"width",e.unit),height:o(e.height,"height",e.unit)},r={width:o(i.width,"width",i.unit),height:o(i.height,"height",i.unit)},a={x:o(t.x,"width",t.unit),y:o(t.y,"height",t.unit)},l={width:o(t.width,"width",t.unit),height:o(t.height,"height",t.unit)};return{coordinates:a,size:l,minSize:n,maxSize:r}},u=(t,e,i,s,h,o)=>{const n=y(t.minSize,{width:1,height:1},i);let r=y(t.maxSize,e,i),a=y(t.size,e,i);r=f(r,e,i);let l=t.coordinates;if(h){const t=S(l,a,n,r,e,i,o.x,o.y);l=t.coordinates,a=t.size}return{coordinates:l,size:a,minSize:n,maxSize:r,imgProps:e,aspectRatio:i,epsilon:s}},g=({coordinates:t,minSize:e,maxSize:i,size:s,imgProps:h})=>{const o=(t,e,i,s)=>{if(t.width>e.width||t.height>e.height)throw x.size(i,t,s,e)};if(o(e,h,"minSize","imageSize"),o(e,i,"minSize","maxSize"),o(e,s,"minSize","startSize"),t.x+s.width>h.width||t.y+s.height>h.height)throw x.startSize("startSize",t,s,"imageSize",h)},m=({size:t,minSize:e,maxSize:i,aspectRatio:s})=>{const h={...t};return i&&(h.width>i.width&&(h.width=i.width,h.height=s?i.width/s:h.height),h.height>i.height&&(h.width=s?i.height*s:h.width,h.height=i.height)),e&&(h.width<e.width&&(h.width=e.width,h.height=s?e.width/s:h.height),h.height<e.height&&(h.width=s?e.height*s:h.width,h.height=e.height)),h},p=(t,e,i)=>{const s=t*e;return{width:s,height:s/i}},w=(t,e,i)=>{const s=t*e;return{width:s*i,height:s}},z=(t,e,i)=>{let s={...t.size};if(i===0)return s;const h=t.isMultiAxis?s.height*i>=s.width:t.isVerticalMovement,o=t.points.x===1||t.points.x===0?1:2,n=t.points.y===1||t.points.y===0?1:2;if(h){const t=s.height;s={width:t*i,height:t}}else{const t=s.width;s={width:t,height:t/i}}return t.coordinates.x+s.width*(1-t.points.x)>e.width&&(s=p(e.width-t.coordinates.x,o,i)),t.coordinates.y+s.height*(1-t.points.y)>e.height&&(s=w(e.height-t.coordinates.y,n,i)),t.coordinates.x-s.width*t.points.x<0&&(s=p(t.coordinates.x,o,i)),t.coordinates.y-s.height*t.points.y<0&&(s=w(t.coordinates.y,n,i)),s},y=(t,e,i)=>{const s={...t};return i&&!s.width&&!s.height&&(i>1?s.height=e.height:s.width=e.width),s.width||(s.width=i?s.height*i:e.width),s.height||(s.height=i?s.width/i:e.height),s},f=(t,e,i)=>{let s={...t};return i&&(s.width>s.height*i?s.width=s.height*i:s.height=s.width/i),s=m({size:s,maxSize:e,aspectRatio:i}),s},S=(t,e,i,s,h,o,n,r)=>{const a={...e},l={...t},c=Math.min(s.width,h.width-t.x),u=Math.min(s.height,h.height-t.y),g=m({size:a,maxSize:{width:c,height:u},minSize:i,aspectRatio:o});return a.width=g.width,a.height=g.height,l.x=n?(h.width-a.width)/2:t.x,l.y=r?(h.height-a.height)/2:t.y,{coordinates:l,size:a}};class it{
/**
   * Creates a new Box instance.
   * @constructor
   * @param {TrueCropperBoxInitConfig} - Initialization parameters.
   */
constructor({coordinates:t,size:e,minSize:s,maxSize:h,imgProps:o,aspectRatio:n,epsilon:r}){i(this,"coordinates");i(this,"size");i(this,"minSize");i(this,"maxSize");i(this,"imgSize");i(this,"aspectRatio");i(this,"epsilon");this.coordinates={...t},this.size={...e},this.minSize={...s},this.maxSize={...h},this.imgSize={...o},this.aspectRatio=n,this.epsilon=r
/**
   * Sets the value of coordinates and size properties based on the provided BoxProps object.
   * @param {TrueCropperBoxProps} box - The BoxProps object containing x, y, width, and height properties.
   * @returns {void}
   */}setValue(t){return t.width<this.minSize.width||t.height<this.minSize.height?{ok:!1,message:"Crop region is smaller than the minimum allowed size."}:t.width>this.maxSize.width||t.height>this.maxSize.height?{ok:!1,message:"Crop region exceeds the maximum allowed size."}:this.aspectRatio&&t.width/t.height-this.aspectRatio>this.epsilon?{ok:!1,message:"Crop region does not match the required aspect ratio."}:t.x<0||t.x>this.imgSize.width||t.y<0||t.y>this.imgSize.height?{ok:!1,message:"Crop region is positioned outside the image boundaries."}:t.x+t.width>this.imgSize.width||t.y+t.height>this.imgSize.height?{ok:!1,message:"Crop region extends beyond the image boundaries."}:(this.coordinates={x:t.x,y:t.y},this.size={width:t.width,height:t.height},{ok:!0,message:"success"}
/**
   * Moves the box to the specified coordinates within the boundaries of the image.
   * @param {TrueCropperCoordinates} coordinates - The new x and y coordinates for the box.
   * @returns {void}
   */)}move(t){this.coordinates.x=Math.min(Math.max(t.x,0),this.imgSize.width-this.size.width),this.coordinates.y=Math.min(Math.max(t.y,0),this.imgSize.height-this.size.height)
/**
   * Resizes the box to a new size.
   * @param {TrueCropperSize} size - The new size for the box.
   * @param {TrueCropperPoints} points - The relative points for resizing.
   * @returns {void}
   */}resize(t,e){if(e.x<0||e.x>1||e.y<0||e.y>1)return{ok:!1,message:"Point coordinates must be within the range of 0 to 1."};const i=this.coordinates.x+this.size.width*e.x,s=this.coordinates.y+this.size.height*e.y,h=i-t.width*e.x,o=s-t.height*e.y;return this.setValue({x:h,y:o,width:t.width,height:t.height})}
/**
   * Scales the box by a factor and relative points.
   * @param {number} factor - The scaling factor.
   * @param {TrueCropperPoints} points - The relative points for scaling.
   * @returns {void}
   */scale(t,e){const i=this.size.width*t,s=this.size.height*t;return this.resize({width:i,height:s},e)}
/**
   * Retrieves the current dimensions of the box.
   * @returns {TrueCropperSize} The width and height of the box.
   */getBoxSize(){return{...this.imgSize}}
/**
   * Retrieves the current coordinates of the box.
   * @returns {TrueCropperCoordinates} The current x and y coordinates of the box.
   */getCoourdinates(){return{x:this.coordinates.x,y:this.coordinates.y}}
/**
   * Retrieves the current box.
   * @returns {TrueCropperBoxProps} The current x and y coordinates, width, and height of the box.
   */getValue(){return{x:this.coordinates.x,y:this.coordinates.y,width:this.size.width,height:this.size.height}}
/**
   * Retrieves the current real(natural) value of the box including coordinates, width, and height.
   * @returns {TrueCropperBoxProps} The current x and y coordinates, width, and height of the box.
   */getValueReal(){return this.getValue()}
/**
   * Retrieves the current value of the box relative to a specified width and height.
   * @param {TrueCropperSize} size - The width and height for calculating relative values.
   * @returns {TrueCropperBoxProps} The current x and y coordinates, width, and height of the box relative to the specified width and height.
   */getValueRelative({width:t,height:e}){return{x:this.coordinates.x*t,y:this.coordinates.y*e,width:this.size.width*t,height:this.size.height*e}}
/**
   * Retrieves the current value of the box as a percentage of the image size.
   * @returns {TrueCropperBoxProps} The current x and y coordinates, width, and height of the box as a percentage of the image size.
   */getValuePercent(){return{x:this.coordinates.x/this.imgSize.width*100,y:this.coordinates.y/this.imgSize.height*100,width:this.size.width/this.imgSize.width*100,height:this.size.height/this.imgSize.height*100}}
/**
   * Calculates the coordinates of the opposite corner of the box based on relative points.
   * @param {TrueCropperPoints} points - The relative points determining the opposite corner.
   * @returns {TrueCropperCoordinates} The calculated x and y coordinates of the opposite corner.
   */getOppositeCornerCoordinates(t){const e=t.x===.5?-1:this.coordinates.x+this.size.width*(1-t.x),i=t.y===.5?-1:this.coordinates.y+this.size.height*(1-t.y);return{x:e,y:i}}
/**
   * Prepares and applies new size and coordinates for the box based on the provided data.
   * @param {TrueCropperNullableBoxData} newBox - The new box data to apply.
   * @returns {boolean} Returns true if the new size and coordinates were successfully applied, false otherwise.
   */prepareAndApplyNewSizeAndCoordinates(t){const e=this.prepareSizeAndCoordinates(t);if(e.size.width===0||e.size.height===0)return!1;const i=this.adjustAndCalculateSize(e),s=this.adjustAndCalculateCoordinate(e.coordinates,i,e.points);return!(s.x<0||s.x+i.width>this.imgSize.width||s.y<0||s.y+i.height>this.imgSize.height)&&(this.size=i,this.coordinates=s,!0
/**
   * Prepares and calculates the size and coordinates for the new box based on the provided data.
   * @param {TrueCropperNullableBoxData} newBox - The new box data to calculate size and coordinates for.
   * @returns {TrueCropperDragData} An object containing the calculated size, coordinates, and other relevant properties.
   */)}prepareSizeAndCoordinates(t){const e={width:t.size.width??this.size.width,height:t.size.height??this.size.height},i={x:t.coordinates.x??this.coordinates.x+this.size.width/2,y:t.coordinates.y??this.coordinates.y+this.size.height/2},s=t.coordinates.y!==null,h=s&&t.coordinates.x!==null;return{size:e,coordinates:i,isVerticalMovement:s,isMultiAxis:h,points:t.points}}
/**
   * Adjusts and calculates the size based on aspect ratio and constraints for the new box.
   * @param {TrueCropperDragData} data - The data containing coordinates, size, and other parameters for adjustment.
   * @returns {TrueCropperSize} The adjusted size within the constraints of aspect ratio, min size, and max size.
   */adjustAndCalculateSize(t){const e=z(t,this.imgSize,this.aspectRatio);return m({size:e,minSize:this.minSize,maxSize:this.maxSize,aspectRatio:this.aspectRatio})}
/**
   * Adjusts and calculates the new coordinates based on the input coordinates, size, and points.
   * @param {TrueCropperCoordinates} coordinates - The original coordinates.
   * @param {TrueCropperSize} size - The size to adjust the coordinates.
   * @param {TrueCropperPoints} points - The points to calculate the adjustment.
   * @returns {TrueCropperCoordinates} The adjusted coordinates based on the size and points.
   */adjustAndCalculateCoordinate(t,e,i){return{x:t.x-e.width*i.x,y:t.y-e.height*i.y}}}function b(t){t.addEventListener("touchstart",C),t.addEventListener("touchend",C),t.addEventListener("touchmove",C)}function C(t){t.preventDefault();const e=t,i=e.changedTouches[0];i.target.dispatchEvent(new MouseEvent(M(e.type),{bubbles:!0,cancelable:!0,view:window,clientX:i.clientX,clientY:i.clientY,screenX:i.screenX,screenY:i.screenY}))}function M(t){switch(t){case"touchstart":return"mousedown";case"touchmove":return"mousemove";default:return"mouseup"}}class ht{
/**
   * Creates an instance of Background.
   *
   * @param parent - The parent HTMLDivElement where the background elements will be appended.
   * @param className - The base CSS class name for the background elements.
   */
constructor(t,e){i(this,"nested",[]);for(let i=0;i<4;i++){const s=r(`${e}-${i}`,t);this.nested.push(s)}}hide(){for(const t of this.nested)t.style.display="none"}show(){for(const t of this.nested)t.style.display="block"}destroy(){for(const t of this.nested)t.remove()}
/**
   * Transforms the background elements based on the provided crop box.
   *
   * @param box - An object representing the crop box, including its x and y coordinates and dimensions.
   */transform(t){const e=t.x+t.width,i=t.y+t.height;this.nested[0].style.height=`${t.y}px`,this.nested[0].style.left=`${t.x}px`,this.nested[0].style.right=`calc(100% - ${t.width}px - ${t.x}px)`,this.nested[1].style.left=`${e}px`,this.nested[2].style.left=`${t.x}px`,this.nested[2].style.right=`calc(100% - ${t.width}px - ${t.x}px)`,this.nested[2].style.top=`${i}px`,this.nested[3].style.width=`${t.x}px`}}class ot{
/**
   * Creates a new NewSelection instance.
   *
   * @param parent - The parent HTMLDivElement where the new selection element is appended.
   * @param className - The CSS class name for styling the new selection element.
   * @param eventBus - A callback function for communicating events (e.g., creating a new box).
   * @param enable - Determines whether the new selection functionality is enabled.
   */
constructor(t,e,s,h){i(this,"eventBus");i(this,"el");i(this,"startMouse",{mouseX:0,mouseY:0});i(this,"newBoxCreated",!1);i(this,"listener");this.eventBus=s,this.el=r(e,t),h?(this.listener=this.mouseEvent(),this.el.addEventListener("mousedown",this.listener)):this.hide()}hide(){this.el.style.display="none"}show(){this.el.style.display="block"}destroy(){this.listener&&this.el.removeEventListener("mousedown",this.listener),this.el.remove()
/**
   * Creates and returns a mousedown event handler that initiates the new selection process.
   *
   * When the user presses the mouse button down, mousemove and mouseup listeners are attached
   * to track the selection process.
   *
   * @returns A mousedown event handler function.
   */}mouseEvent(){const t=t=>{t.stopPropagation(),document.addEventListener("mousemove",e),document.addEventListener("mouseup",i),this.startMouse={mouseX:t.clientX,mouseY:t.clientY},this.newBoxCreated=!1},e=t=>{if(t.stopPropagation(),this.newBoxCreated){const e={x:t.clientX,y:t.clientY};this.eventBus({type:"handlemove",data:e})}else this.tryToCreateNewBox(t.clientX,t.clientY)},i=t=>{t.stopPropagation(),document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",i),this.newBoxCreated&&this.eventBus({type:"handleend"})};return t}
/**
   * Attempts to create a new crop box based on the current mouse coordinates.
   *
   * This method calculates the new crop box dimensions from the starting mouse position
   * and the current mouse position, then notifies the parent via the event bus.
   *
   * @param mouseX - The current x-coordinate of the mouse.
   * @param mouseY - The current y-coordinate of the mouse.
   */tryToCreateNewBox(t,e){if(t===this.startMouse.mouseX||e===this.startMouse.mouseY)return;const i=t<this.startMouse.mouseX,s=e<this.startMouse.mouseY,[h,o]=i?[t,this.startMouse.mouseX-t]:[this.startMouse.mouseX,t-this.startMouse.mouseX],[n,r]=s?[e,this.startMouse.mouseY-e]:[this.startMouse.mouseY,e-this.startMouse.mouseY],a={coordinates:{x:h,y:n},size:{width:o,height:r},leftMovable:i,topMovable:s};this.newBoxCreated=this.eventBus({type:"createnewbox",data:a})}}class rt{
/**
   * Creates a new Selection instance.
   *
   * @param parent - The parent HTMLDivElement to which the selection element is appended.
   * @param className - The CSS class name assigned to the selection element.
   * @param eventBus - A callback to emit events related to selection interactions.
   * @param enable - Determines if the selection element should be interactive.
   */
constructor(t,e,s,h){i(this,"eventBus");i(this,"el");i(this,"enable");i(this,"listener");this.eventBus=s,this.el=r(e,t),this.enable=h,h?(this.listener=this.mouseEvent(),this.el.addEventListener("mousedown",this.listener)):this.el.style.cursor="default"
/**
   * Transforms the selection element to match the specified crop box dimensions.
   *
   * @param box - An object containing the x, y coordinates and width, height dimensions.
   */}transform(t){this.el.style.transform=`translate(${t.x}px, ${t.y}px)`,this.el.style.width=`${t.width}px`,this.el.style.height=`${t.height}px`}hide(){this.el.style.display="none",this.el.style.cursor="default"}show(){this.el.style.display="block",this.el.style.cursor="move"}destroy(){this.listener&&this.el.removeEventListener("mousedown",this.listener),this.el.remove()
/**
   * Creates and returns a mousedown event handler for the selection element.
   *
   * This handler attaches mousemove and mouseup listeners to the document to enable
   * dragging of the selection element. It emits corresponding events via the event bus.
   *
   * @returns A mousedown event handler function.
   */}mouseEvent(){const t=t=>{if(t.stopPropagation(),!this.enable)return;document.addEventListener("mousemove",e),document.addEventListener("mouseup",i);const s={x:t.clientX,y:t.clientY};this.eventBus({type:"regionstart",data:s})},e=t=>{t.stopPropagation();const e={x:t.clientX,y:t.clientY};this.eventBus({type:"regionmove",data:e})},i=t=>{t.stopPropagation(),document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",i);const s={x:t.clientX,y:t.clientY};this.eventBus({type:"regionend",data:s})};return t}}const E=["real","relative","percent"];var I=(t=>(t.Waiting="waiting",t.Ready="ready",t.Reloading="reloading",t.Error="error",t))(I||{});const k=h.base;function R(t){return t.charAt(0).toUpperCase()+t.slice(1)}function $(t){return t==null}function B(t,e,i,s=!1,h=!1){if($(e))return i;if(typeof e!="number")throw d.new(t,"number");if(Number.isNaN(e))throw d.new(t,"NaN",!1);if(s?e<0:e<=0)throw d.new(t,"positive");if(!h&&e>0&&e<1)throw d.new(t,"fractional");return e}function N(t,e,i){if($(e))return i;if(typeof e!="boolean")throw d.new(t,"boolean");return e}function P(t,e,i){if($(e))return i;if(typeof e!="string"||!E.includes(e))throw d.new(t,"SizeUnit");return e}const X=(t,e)=>{var i,s,h,o,n,r,a,l,c,u,g,m,p,w,z,y;const f=e||{};if(typeof f!="object"||f===null)throw d.new("options","object");const S=(e,i)=>{const s=t[`${k}${R(e)}`];if(!s)return i;const h=s.toLowerCase();return h==="null"||h==="undefined"||h==="nil"?i:s.trim().length===0||Number.isNaN(Number(s))?h==="true"||h!=="false"&&s:Number(s)},b={aspectRatio:S("aspectRatio",f.aspectRatio),epsilon:S("epsilon",f.epsilon),allowFlip:S("allowFlip",f.allowFlip),allowNewSelection:S("allowNewSelection",f.allowNewSelection),allowMove:S("allowMove",f.allowMove),allowResize:S("allowResize",f.allowResize),returnMode:S("returnMode",f.returnMode),minSize:{width:S("minSizeWidth",(i=f.minSize)==null?void 0:i.width),height:S("minSizeHeight",(s=f.minSize)==null?void 0:s.height),unit:S("minSizeUnit",(h=f.minSize)==null?void 0:h.unit)},maxSize:{width:S("maxSizeWidth",(o=f.maxSize)==null?void 0:o.width),height:S("maxSizeHeight",(n=f.maxSize)==null?void 0:n.height),unit:S("maxSizeUnit",(r=f.maxSize)==null?void 0:r.unit)},startSize:{x:S("startSizeX",(a=f.startSize)==null?void 0:a.x),y:S("startSizeY",(l=f.startSize)==null?void 0:l.y),width:S("startSizeWidth",(c=f.startSize)==null?void 0:c.width),height:S("startSizeHeight",(u=f.startSize)==null?void 0:u.height),unit:S("startSizeUnit",(g=f.startSize)==null?void 0:g.unit)},defaultSize:{x:S("defaultSizeX",(m=f.defaultSize)==null?void 0:m.x),y:S("defaultSizeY",(p=f.defaultSize)==null?void 0:p.y),width:S("defaultSizeWidth",(w=f.defaultSize)==null?void 0:w.width),height:S("defaultSizeHeight",(z=f.defaultSize)==null?void 0:z.height),unit:S("defaultSizeUnit",(y=f.defaultSize)==null?void 0:y.unit)}};return $(b.startSize.x)&&$(b.startSize.y)&&$(b.startSize.width)&&$(b.startSize.height)&&(b.startSize=b.defaultSize),b},Y=(t,e,i)=>Math.abs(t-e)<i,L=t=>{var e;const i=B("aspectRatio",t.aspectRatio,0,!1,!0),s=B("epsilon",t.epsilon,h.epsilon,!0,!0),o={width:B("minSizeWidth",t.minSize.width,0),height:B("minSizeHeight",t.minSize.height,0),unit:P("minSizeUnit",(e=t.minSize)==null?void 0:e.unit,"real")},n={width:B("maxSizeWidth",t.maxSize.width,0),height:B("maxSizeHeight",t.maxSize.height,0),unit:P("maxSizeUnit",t.maxSize.unit,"real")},r={x:B("startSizeX",t.startSize.x,0,!0),y:B("startSizeY",t.startSize.y,0,!0),width:B("startSizeWidth",t.startSize.width,0),height:B("startSizeHeight",t.startSize.height,0),unit:P("startSizeUnit",t.startSize.unit,"real"),centeredX:$(t.startSize.x),centeredY:$(t.startSize.y),allowChange:!1};r.allowChange=r.width===0&&r.height===0;const a={x:B("defaultSizeX",t.defaultSize.x,0,!0),y:B("defaultSizeY",t.defaultSize.y,0,!0),width:B("defaultSizeWidth",t.defaultSize.width,0),height:B("defaultSizeHeight",t.defaultSize.height,0),unit:P("defaultSizeUnit",t.defaultSize.unit,"real"),centeredX:$(t.defaultSize.x),centeredY:$(t.defaultSize.y),allowChange:!1};if(a.allowChange=a.width===0&&a.height===0,i){if(o.width&&o.height){const t=o.width/o.height;if(!Y(t,i,s))throw d.aspectRatio("minimum",t,i,s)}if(a.width&&a.height){const t=a.width/a.height;if(!Y(t,i,s))throw d.aspectRatio("defaultSize",t,i,s)}if(r.width&&r.height){const t=r.width/r.height;if(!Y(t,i,s))throw d.aspectRatio("startSize",t,i,s)}}if(!r.centeredX&&r.width===0)throw d.widthIsNull("firstInitSize");if(!r.centeredY&&r.height===0)throw d.heightIsNull("firstInitSize");if(!a.centeredX&&a.width===0)throw d.widthIsNull("startSize");if(!a.centeredY&&a.height===0)throw d.heightIsNull("startSize");if(a.unit==="percent"&&(a.x+a.width>100||a.y+a.height>100))throw d.badSizeOfPercent("startSize");if(r.unit==="percent"&&(r.x+r.width>100||r.y+r.height>100))throw d.badSizeOfPercent("firstInitSize");if(o.unit==="percent"&&(o.width>100||o.height>100))throw d.badSizeOfPercent("minSize");if(n.unit==="percent"&&(n.width>100||n.height>100))throw d.badSizeOfPercent("maxSize");return{aspectRatio:i,epsilon:s,allowFlip:N("allowFlip",t.allowFlip,!0),allowNewSelection:N("allowNewSelection",t.allowNewSelection,!0),allowMove:N("allowMove",t.allowMove,!0),allowResize:N("allowResize",t.allowResize,!0),returnMode:P("returnMode",t.returnMode,"real"),minSize:o,maxSize:n,firstInitSize:r,startSize:a}};class gt{
/**
   * Creates an instance of the Handle.
   *
   * @param parent - The parent HTMLDivElement to which the handle element is appended.
   * @param className - The CSS class name to assign to the handle element.
   * @param item - The handle configuration object, including its position and cursor style.
   * @param eventBus - A callback function to handle events emitted by the handle.
   * @param enable - Determines whether the handle is enabled.
   */
constructor(t,e,s,h,o){i(this,"position");i(this,"eventBus");i(this,"el");i(this,"enable");i(this,"listener");this.position=s.position,this.eventBus=h,this.enable=o,this.el=r(e,t),this.el.style.cursor=s.cursor,o?(this.listener=this.mouseEvent(),this.el.addEventListener("mousedown",this.listener)):this.hide()}show(){this.el.style.display="block"}hide(){this.el.style.display="none"}destroy(){this.listener&&this.el.removeEventListener("mousedown",this.listener),this.el.remove()
/**
   * Transforms the handle's position based on the provided crop box properties.
   *
   * @param box - The crop box properties (x, y, width, height).
   */}transform(t){const e=this.el.offsetWidth,i=this.el.offsetHeight,s=t.x+t.width*this.position.x-e/2,h=t.y+t.height*this.position.y-i/2;this.el.style.transform=`translate(${s}px, ${h}px)`}
/**
   * Retrieves data associated with the handle.
   *
   * @returns An object containing the handle's normalized position.
   */getData(){return{points:{...this.position}}}
/**
   * Creates and returns a mouse event handler for the handle.
   *
   * This function attaches mousemove and mouseup listeners to the document when a mousedown event is detected.
   *
   * @returns The mousedown event handler function.
   */mouseEvent(){const t=t=>{if(t.stopPropagation(),!this.enable)return;document.addEventListener("mousemove",e),document.addEventListener("mouseup",i);const s=this.getData();this.eventBus({type:"handlestart",data:s})},e=t=>{t.stopPropagation();const e={x:t.clientX,y:t.clientY};this.eventBus({type:"handlemove",data:e})},i=t=>{t.stopPropagation(),document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",i),this.eventBus({type:"handleend"})};return t}}const D=[{position:{x:0,y:0},cursor:"nw-resize"},{position:{x:.5,y:0},cursor:"n-resize"},{position:{x:1,y:0},cursor:"ne-resize"},{position:{x:1,y:.5},cursor:"e-resize"},{position:{x:1,y:1},cursor:"se-resize"},{position:{x:.5,y:1},cursor:"s-resize"},{position:{x:0,y:1},cursor:"sw-resize"},{position:{x:0,y:.5},cursor:"w-resize"}];class wt{
/**
   * Creates a new instance of the Handles collection.
   *
   * @param parent - The parent HTMLDivElement to which the handles container is appended.
   * @param className - The CSS class name for the handles container.
   * @param eventBus - A callback function to handle events emitted by the handles.
   * @param enable - Determines whether the handles are enabled for user interaction.
   * @param handleClassName - The CSS class name for individual handle elements.
   */
constructor(t,e,s,h,o){i(this,"el");i(this,"handles",[]);this.el=r(e,t);for(const t of D){const e=new gt(this.el,o,t,s,h);this.handles.push(e)}}hide(){for(const t of this.handles)t.hide()}show(){for(const t of this.handles)t.show()}destroy(){for(const t of this.handles)t.destroy();this.el.remove()}
/**
   * Transforms (repositions) all handles based on the provided crop box dimensions.
   *
   * @param box - An object representing the crop box properties (x, y, width, height).
   */transform(t){for(const e of this.handles)e.transform(t)}
/**
   * Retrieves a handle based on the movability of the crop box edges.
   *
   * @param leftMovable - Indicates whether the left edge of the crop box is movable.
   * @param topMovable - Indicates whether the top edge of the crop box is movable.
   * @returns The handle corresponding to the specified movability configuration.
   */handleByMovableType(t,e){return t?e?this.handles[0]:this.handles[6]:e?this.handles[2]:this.handles[4]}}const H={width:0,height:0};class pt{constructor(t,e){i(this,"replaceDOM",!1);i(this,"htmlContainer");i(this,"htmlImg");i(this,"options");i(this,"newSelection");i(this,"selection");i(this,"handles");i(this,"background");i(this,"box");i(this,"currentMove");i(this,"activeHandle");i(this,"real",H);i(this,"relative",H);i(this,"ratio",H);i(this,"firstInit",!0);i(this,"isDomCreated",!1);i(this,"status",I.Waiting);i(this,"eventBus",this.event.bind(this));i(this,"observer");i(this,"preventDoubleLoad");i(this,"callbacks",{onInitialize:void 0,onCropStart:void 0,onCropChange:void 0,onCropEnd:void 0,onError:void 0});try{this.parseCallbackFunctions(e);const[i,s]=n(t);this.htmlImg=i,s?this.htmlContainer=s:this.replaceDOM=!0,this.changeStatus(I.Waiting);const h=X(this.htmlImg.dataset,e);this.options=L(h),this.initializeCropper()}catch(t){if(!(t instanceof v||t instanceof d))throw t;this.onErrorCallback(t)}}getImagePreview(){if(this.status!=="ready"||!this.htmlImg.complete||this.htmlImg.naturalWidth===0||this.htmlImg.naturalHeight===0)return null;const t=this.getValue("real");if(!t||t.width<=0||t.height<=0||t.x<0||t.y<0||t.x+t.width>this.htmlImg.naturalWidth||t.y+t.height>this.htmlImg.naturalHeight)return null;const e=document.createElement("canvas"),i=window.devicePixelRatio||1;e.width=t.width*i,e.height=t.height*i,e.style.width=`${t.width}px`,e.style.height=`${t.height}px`;const s=e.getContext("2d");return s?(s.scale(i,i),s.drawImage(this.htmlImg,t.x,t.y,t.width,t.height,0,0,t.width,t.height),e):null}
/**
   * Changes the image src.
   * @param {String} src
   */setImage(t){t&&t.length!==0&&(this.firstInit=!1,this.htmlImg.src=t)}reset(){try{this.firstInit=!1,this.destroy(),this.initializeCropper()}catch(t){if(!(t instanceof v||t instanceof d||t instanceof x))throw t;this.onErrorCallback(t)}}destroy(){this.isDomCreated&&(this.observer.unobserve(this.htmlImg),this.newSelection.destroy(),this.handles.destroy(),this.selection.destroy(),this.background.destroy(),this.replaceDOM&&this.htmlContainer.parentElement&&this.htmlContainer.parentElement.replaceChild(this.htmlImg,this.htmlContainer)),this.isDomCreated=!1
/**
   * Moves the crop region to a specified coordinate.
   * @param {TrueCropperCoordinates} coordinates
   */}moveTo(t,e=void 0){if(typeof t!="object"||!t||typeof t.x!="number"||typeof t.y!="number")return;const i=this.coordinatesToReal(t,e);this.box.move(i),this.redraw(),this.onCropEndCallback()
/**
   * Resizes the crop region to a specified width and height.
   * @param {SiTrueCropperSizeze} size
   * @param {TrueCropperPoints} points
   */}resizeTo(t,e={x:.5,y:.5},i=void 0){if(typeof t!="object")return{ok:!1,message:"Size must be provided as an Size object."};if(!t||typeof t.width!="number"||typeof t.height!="number")return{ok:!1,message:"Size object must have numeric 'width' and 'height' properties."};if(typeof e!="object")return{ok:!1,message:"Points must be provided as an Points object."};if(!e||typeof e.x!="number"||typeof e.y!="number")return{ok:!1,message:"Points object must have numeric 'x' and 'y' properties."};const s=this.sizeToReal(t,i);this.box.resize(s,e),this.redraw(),this.onCropEndCallback()
/**
   * Scale the crop region by a factor.
   * @param {Number} factor
   * @param {TrueCropperPoints} points
   */}scaleBy(t,e={x:.5,y:.5}){if(typeof t!="number")return{ok:!1,message:"factor must be provided as numeric."};const i=this.box.scale(t,e);return i.ok&&(this.redraw(),this.onCropEndCallback()),i
/**
   * Sets the value of a box.
   * @param {TrueCropperBoxProps} box - The box object containing properties to set.
   * @public
   */}setValue(t,e=void 0){if(typeof t!="object")return{ok:!1,message:"Size must be provided as an BoxProps object."};if(!t||typeof t.x!="number"||typeof t.y!="number"||typeof t.width!="number"||typeof t.height!="number")return{ok:!1,message:"BoxProps object must have numeric 'x', 'y', 'width' and 'height' properties."};const i=this.boxToReal(t,e),s=this.box.setValue(i);return s.ok&&(this.redraw(),this.onCropEndCallback()),s
/**
   * Get the value of the crop region.
   * @param {TrueCropperSizeUnit | undefined} mode - The mode of return value type. If null, defaults to the return mode set in returnMode options.
   * @returns {number} - The value of the crop region.
   */}getValue(t=void 0){const e=t||this.options.returnMode,i=e==="relative"?this.box.getValueRelative(this.ratio):e==="percent"?this.box.getValuePercent():this.box.getValueReal();return{x:Math.round(i.x),y:Math.round(i.y),width:Math.round(i.width),height:Math.round(i.height)}}
/**
   * Retrieves the image properties.
   * @returns {real: TrueCropperSize, relative: TrueCropperSize} An object containing the real and relative properties.
   * @public
   */getImageProps(){return{real:this.real,relative:this.relative}}
/**
   * Retrieves the status of the instance.
   * @returns {TrueCropperStatus} The status of the instance.
   */getStatus(){return this.status}onInitializeCallback(){this.callbacks.onInitialize&&this.callbacks.onInitialize(this,this.getValue())}onCropStartCallback(){this.callbacks.onCropStart&&this.callbacks.onCropStart(this,this.getValue())}onCropChangeCallback(){this.callbacks.onCropChange&&this.callbacks.onCropChange(this,this.getValue())}onCropEndCallback(){const t=this.getValue();this.setDatasetCropValues(t),this.callbacks.onCropEnd&&this.callbacks.onCropEnd(this,t)
/**
   * Handles errors encountered during operations.
   * @param {TrueCropperHtmlError | TrueCropperImageError | TrueCropperOptionsError} error - The error object containing information about the error.
   */}onErrorCallback(t){this.changeStatus(I.Error);const e={name:t.name,message:t.message,messageId:t.messageId,data:t.data};if(this.destroy(),!this.callbacks.onError)throw t;this.callbacks.onError(this,e)}initializeObserver(){this.observer=new ResizeObserver((t=>{for(const e of t){const t=e.target;t===this.htmlImg&&t.complete&&t.width!==0&&(this.updateRelativeSize(),this.redraw())}}))}initializeCropper(){this.initializeObserver(),this.htmlImg.src&&this.htmlImg.complete&&this.htmlImg.width!==0&&this.htmlImg.height!==0&&(this.preventDoubleLoad=this.htmlImg.src,this.initialize()),this.htmlImg.onload=()=>{!this.htmlImg.src||this.preventDoubleLoad===this.htmlImg.src||(this.preventDoubleLoad=void 0,this.changeStatus(this.status===I.Waiting?I.Waiting:I.Reloading),this.observer.unobserve(this.htmlImg),this.initialize())}}initialize(){try{this.createDOM(),this.calcContainerProps(),this.updateRelativeSize(),this.createNewBox(),this.onInitializeCallback(),this.observer.observe(this.htmlImg),this.changeStatus(I.Ready),this.onCropEndCallback()}catch(t){if(!(t instanceof x))throw t;this.onErrorCallback(t)}}createDOM(){if(this.isDomCreated)return;this.replaceDOM&&(this.htmlContainer=document.createElement("div"),this.htmlContainer.classList.add(h.base),this.htmlImg.parentElement&&this.htmlImg.parentElement.replaceChild(this.htmlContainer,this.htmlImg),this.htmlContainer.appendChild(this.htmlImg));const t=this.htmlContainer;b(t),this.htmlImg.classList.add(h.img),this.background=new ht(t,h.background),this.newSelection=new ot(t,h.new,this.eventBus,this.options.allowNewSelection),this.selection=new rt(t,h.selection,this.eventBus,this.options.allowMove),this.handles=new wt(t,h.hanleds,this.eventBus,this.options.allowResize,h.handle),this.isDomCreated=!0}calcContainerProps(){this.real={width:this.htmlImg.naturalWidth,height:this.htmlImg.naturalHeight}}createNewBox(){let t=this.options.startSize;this.firstInit&&(this.firstInit=!1,t=this.options.firstInitSize);const e={x:t.centeredX,y:t.centeredX},i=t.allowChange,s=c(t,this.options.minSize,this.options.maxSize,this.real,this.ratio),h=u(s,this.real,this.options.aspectRatio,this.options.epsilon,i,e);g(h),this.box=new it(h)}updateRelativeSize(){const{width:t,height:e}=this.htmlImg.getBoundingClientRect();this.htmlImg.offsetWidth===0||this.htmlImg.offsetHeight===0?this.relative={width:this.real.width,height:this.real.height}:this.relative={width:t,height:e},this.ratio={width:this.relative.width/this.real.width,height:this.relative.height/this.real.height}}changeStatus(t){this.status=t,this.htmlImg&&this.setDataset(h.valueStatus,t)}redraw(){const t=this.box.getValueRelative(this.ratio);this.selection.transform(t),this.background.transform(t),this.handles.transform(t)}event({type:t,data:e}){switch(t){case"handlestart":this.onHandleMoveStart(e);break;case"handlemove":this.onHandleMoveMoving(e);break;case"handleend":this.onHandleMoveEnd();break;case"regionstart":this.onRegionMoveStart(e);break;case"regionmove":this.onRegionMoveMoving(e);break;case"regionend":this.onRegionMoveEnd();break;case"createnewbox":return this.tryToCreateNewBox(e)}return!0}tryToCreateNewBox({coordinates:t,size:e,leftMovable:i,topMovable:s}){const h=this.handles.handleByMovableType(i,s).getData(),o={coordinates:this.mouseCoordinates(t),size:e,points:h.points};return!!this.box.prepareAndApplyNewSizeAndCoordinates(o)&&(this.redraw(),this.onHandleMoveStart(h),!0)}onHandleMoveStart(t){const{x:e,y:i}=this.box.getOppositeCornerCoordinates(t.points);this.activeHandle={x:{left:t.points.x===0,savedCoordinate:e},y:{left:t.points.y===0,savedCoordinate:i}},this.onCropStartCallback()}onHandleMoveMoving(t){const e=this.mouseCoordinates(t),i=l(e,this.activeHandle.x,this.activeHandle.y);!this.options.allowFlip&&(i.flipped.x||i.flipped.y)||(this.box.prepareAndApplyNewSizeAndCoordinates(i.newBox)&&this.redraw(),this.onCropChangeCallback())}onHandleMoveEnd(){this.onCropEndCallback()}
/**
   * Executes when user starts moving the crop region.
   * @param {TrueCropperRegionMoveEvent["data"]} data - contains the raw mouseX, mouseY coordinate
   */onRegionMoveStart(t){const{x:e,y:i}=this.mouseCoordinates(t),s=this.box.getCoourdinates();this.currentMove={offsetX:e-s.x,offsetY:i-s.y},this.onCropStartCallback()}onRegionMoveMoving(t){const{offsetX:e,offsetY:i}=this.currentMove,{x:s,y:h}=this.mouseCoordinates(t);this.box.move({x:s-e,y:h-i}),this.redraw(),this.onCropChangeCallback()}onRegionMoveEnd(){this.onCropEndCallback()}
/**
   * Get the real(natural) mouse coordinates within the image container.
   * @param {number} absMouseX - The absolute X coordinate of the mouse.
   * @param {number} absMouseY - The absolute Y coordinate of the mouse.
   * @returns {[number, number]} - The real(natural) X and Y coordinates within the image container.
   */mouseCoordinates(t){const e=this.htmlImg.getBoundingClientRect();let i=t.x-e.left,s=t.y-e.top;return i=Math.min(Math.max(i,0),this.relative.width)/this.ratio.width,s=Math.min(Math.max(s,0),this.relative.height)/this.ratio.height,{x:i,y:s}
/**
   * Sets a value to a dataset attribute of an HTML image element.
   * @param {string} name - The name of the dataset attribute.
   * @param {string | number} value - The value to set for the dataset attribute.
   */}setDataset(t,e){this.htmlImg.dataset[t]=e.toString()}parseCallbackFunctions(t){t&&(t.onError&&typeof t.onError=="function"&&(this.callbacks.onError=t.onError),t.onInitialize&&typeof t.onInitialize=="function"&&(this.callbacks.onInitialize=t.onInitialize),t.onCropStart&&typeof t.onCropStart=="function"&&(this.callbacks.onCropStart=t.onCropStart),t.onCropChange&&typeof t.onCropChange=="function"&&(this.callbacks.onCropChange=t.onCropChange),t.onCropEnd&&typeof t.onCropEnd=="function"&&(this.callbacks.onCropEnd=t.onCropEnd))}setDatasetCropValues(t){const e=t||this.getValue();this.setDataset(h.valueX,e.x),this.setDataset(h.valueY,e.y),this.setDataset(h.valueWidth,e.width),this.setDataset(h.valueHeight,e.height)
/**
   * Converts a single numeric value from a given mode ("relative", "percent", or "real")
   * into its corresponding real value.
   *
   * @param value - The original value to convert.
   * @param ratio - The reference ratio (e.g., this.ratio.width or this.ratio.height) used for relative conversion.
   * @param total - The total dimension (from the image size) used for percent conversion.
   * @param mode - The conversion mode.
   * @returns The converted value.
   */}getConvertedValue(t,e,i,s){return s==="relative"?t/e:s==="percent"?i*t/100:t}
/**
   * Converts coordinate values (x and y) into their real equivalents based on the specified mode.
   *
   * @param coordinates - The coordinates to convert.
   * @param mode - The conversion mode ("relative", "percent", or "real").
   *               Defaults to `this.options.returnMode` if not provided.
   * @returns The converted coordinates.
   */coordinatesToReal(t,e=void 0){const i=e||this.options.returnMode;if(i==="real")return{...t};const s=this.box.getBoxSize();return{x:this.getConvertedValue(t.x,this.ratio.width,s.width,i),y:this.getConvertedValue(t.y,this.ratio.height,s.height,i)}}
/**
   * Converts size values (width and height) into their real equivalents based on the specified mode.
   *
   * @param size - The size object to convert.
   * @param mode - The conversion mode ("relative", "percent", or "real").
   *               Defaults to `this.options.returnMode` if not provided.
   * @returns The converted size object.
   */sizeToReal(t,e=void 0){const i=e||this.options.returnMode;if(i==="real")return{...t};const s=this.box.getBoxSize();return{width:this.getConvertedValue(t.width,this.ratio.width,s.width,i),height:this.getConvertedValue(t.height,this.ratio.height,s.height,i)}}
/**
   * Converts a box's properties (both position and size) into their real equivalents
   * based on the specified mode.
   *
   * @param box - The box properties to convert.
   * @param mode - The conversion mode ("relative", "percent", or "real").
   *               Defaults to `this.options.returnMode` if not provided.
   * @returns The converted box properties.
   */boxToReal(t,e=void 0){const i=e||this.options.returnMode;return i==="real"?t:{...this.coordinatesToReal({x:t.x,y:t.y},i),...this.sizeToReal({width:t.width,height:t.height},i)}}}export{pt as default};

