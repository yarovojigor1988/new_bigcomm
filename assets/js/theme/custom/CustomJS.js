import $ from 'jquery'
import 'slick-carousel';
import PageManager from '../page-manager'

export default class CustomDemo extends PageManager {
    onReady () {



    }
}

console.log('document ready')
$('#customSlickId').slick({
    infinite: true,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    responsive: [
            {
                breakpoint: 801,
                settings: {
                arrows: false
            }
        }
    ]
});