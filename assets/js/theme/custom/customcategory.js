import PageManager from '../page-manager'

export default class CustomDemo extends PageManager {
    onReady () {


        if(document.getElementById("custom_options_added")){

            let giftOptionId = "attribute_text_"+this.context.giftOptionId;
            console.log(giftOptionId);

        function showGiftTextField() {
            let element = document.getElementById('giftFieldForm');
            element.style.display = "block";
            document.getElementById(giftOptionId).setAttribute("required", "");
            element.required = true; 
        }
        
        function hideGiftTextField() {
            document.getElementById('giftFieldForm').style.display = "none";
            document.getElementById(giftOptionId).removeAttribute("required");
            document.getElementById('attribute_text_custom_email').removeAttribute("required");
        }
        
        function showGiftEmailTextField() {
            let element = document.getElementById('GiftEmailField');
            element.style.display = "block";
            document.getElementById('attribute_text_custom_email').setAttribute("required", "");
            element.required = true; 
        }
        
        function hideGiftEmailField() {
            let element = document.getElementById('GiftEmailField');
            element.style.display = "none";
            document.getElementById('attribute_text_custom_email').removeAttribute("required");
            document.getElementById('attribute_text_custom_email').value="";
        
        }
        
        function checkGiftText (){
            let patternstr = '^[A-Za-z0-9., \n]{0,300}$';
            let giftText = document.getElementById(giftOptionId);
            let constraint = new RegExp(patternstr, "");
            if (giftText.value.length > 200) {
                giftText.setCustomValidity("Too much symbols. Please, make your text shorter. 200 symbols maximum.");
                giftText.dataset.validated="false";
            } else if (constraint.test(giftText.value)) {
            giftText.setCustomValidity("");
            giftText.dataset.validated="true";

            }
            else {
            giftText.setCustomValidity("Unknown or restricted symbol: A congratulatory inscription should consist of letters, commas, and dots.");
            giftText.dataset.validated="false";

            }
        }

        function checkCustomMailText(){
            let patternstr = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
            let giftMailText = document.getElementById("attribute_text_custom_email");
            let constraint = new RegExp(patternstr, "");
            if (constraint.test(giftMailText.value)) {
                giftMailText.dataset.validated="true";
                giftMailText.setCustomValidity("");
                
            }
            else {
                giftMailText.dataset.validated="false";
                giftMailText.setCustomValidity("Please enter a valid email address.");
            }
        }

        function clearCustomData() {
            document.getElementById('show_gift_option').checked =false;
            document.getElementById(giftOptionId).value="";
            document.getElementById('not_show_gift_option').checked =true;
            document.getElementById('show_gift_email_option').checked=false;
            document.getElementById('attribute_text_custom_email').value="";
            document.getElementById('not_show_gift_email').checked=true;
            hideGiftTextField();
            hideGiftEmailField();
        }

        function checkCloseCart(e){
            console.log(e.target.dataset);
            if (e.target.classList.contains('modal-close') || e.target.parentElement.classList.contains('modal-close')){
                clearCustomData();
            };
            if (e.target.dataset.revealClose === ""){
                clearCustomData();
            }
        }

        function checkCloseCart2(e){
            if (e.target.classList.contains('modal-background') && document.getElementById('previewModal').style.display == "block" ){
                clearCustomData();
            }

            if (e.target.classList.contains('modal-background')){
                console.log(document.getElementById('previewModal').style.display);
            }
        }

        clearCustomData();

        document.getElementById("attribute_text_custom_email").onchange = checkCustomMailText; 
        document.getElementById(giftOptionId).onchange = checkGiftText; 
        document.getElementById("not_show_gift_option").addEventListener('change', hideGiftTextField, false); 
        document.getElementById("show_gift_option").addEventListener('change', showGiftTextField, false); 
        document.getElementById("not_show_gift_email").addEventListener('change', hideGiftEmailField, false); 
        document.getElementById("show_gift_email_option").addEventListener('change', showGiftEmailTextField, false); 

        function checkGiftTextSubmitted(){
            if (document.getElementById('not_show_gift_option').checked === true) {
                document.getElementById(giftOptionId).value ="";
            } else if (document.getElementById('show_gift_email_option').checked === false && document.getElementById(giftOptionId).value !== "" && document.getElementById(giftOptionId).dataset.validated ==="true" ){
                document.getElementById(giftOptionId).value +="\n Print congratulatory on a gift card";

            }else if (document.getElementById('show_gift_email_option').checked === true && document.getElementById(giftOptionId).value !== "" && document.getElementById("attribute_text_custom_email").dataset.validated ==="true"){
                document.getElementById(giftOptionId).value +="\n" + "Send congratulatory on Email:" + document.getElementById('attribute_text_custom_email').value;

            }
            document.body.addEventListener('click', checkCloseCart2, false); 
            console.log(document.getElementById(giftOptionId).value);
        };

        document.getElementById("form-action-addToCart").addEventListener('click', checkGiftTextSubmitted, false); 
        document.getElementById("previewModal").addEventListener('click', checkCloseCart, false); 
        }
    } 
}
