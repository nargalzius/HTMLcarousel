// @codekit-prepend "../../device.js"

var images = [
    {
        src: "https://farm9.staticflickr.com/8612/27669850714_79a89c35c5_o.jpg",
        title: "Huckleberry & Co. Atticus",
        url: "https://www.kickstarter.com/projects/huckleberryandco/archibald-a-bauhaus-designed-automatic-watch-by-ha"
    },
    {
        src: "https://farm9.staticflickr.com/8829/28324854376_c8fefe36fe_o.jpg",
        title: "StuckX The Bull",
        url: "http://kck.st/1OzuQa7"
    },
    {
        src: "https://farm9.staticflickr.com/8214/28300693942_d8e0a99a10_o.jpg",
        title: "Redux COURG Type-A",
        url: "https://www.kickstarter.com/projects/reduxwatch/redux-courg-hybrid-watches-with-missions-to-tackle"
    },
    {
        src: "https://farm1.staticflickr.com/571/23472287050_d0ba897e6f_o.jpg",
        title: "Visitor Calligraph Duneshore",
        url: "http://kck.st/1ulYPMI"
    },
    {
        src: "https://farm1.staticflickr.com/618/22135977040_82c258665b_o.jpg",
        title: "Zelos Abyss",
        url: "http://kck.st/1CQDHBV"
    },
    {
        src: "https://farm6.staticflickr.com/5801/30396986435_f2f33ef5c7_o.jpg",
        title: "XFrame Vulcan",
        url: "http://kck.st/1LxXm9U"
    },
    {
        src: "https://farm1.staticflickr.com/693/22315911284_9e9255c24b_o.jpg",
        title: "Smith & Bradley Ambush",
        url: "http://kck.st/1k3BZoY"
    },
    {
        src: "https://farm1.staticflickr.com/557/20000385931_4fdc223e2f_o.jpg",
        title: "Apple Watch",
        url: "http://www.apple.com/shop/buy-watch/apple-watch"
    },
    {
        src: "https://farm9.staticflickr.com/8864/18230308095_c2e85ac103_o.jpg",
        title: "LIV GX1",
        url: "http://kck.st/1u5dOsz"
    },
    {
        src: "https://farm8.staticflickr.com/7781/18370711672_b141c07373_o.jpg",
        title: "Rolex Milgauss",
        url: "https://www.rolex.com/watches/milgauss/m116400gv-0001.html"
    },
    {
        src: "https://farm8.staticflickr.com/7622/17183213822_835fe60486_o.jpg",
        title: "Girard Perregaux",
        url: "https://www.flickr.com/photos/nargalzius/sets/72157652034902315"
    },
    {
        src: "https://farm9.staticflickr.com/8749/17111139906_f5f504e2d5_o.jpg",
        title: "Division Furtive Type-50",
        url: "http://kck.st/1tw5Tk7"
    },
    {
        src: "https://farm1.staticflickr.com/370/19520096038_af29492237_o.jpg",
        title: "Eone Bradley",
        url: "http://kck.st/1av4Cpy"
    },
    {
        src: "https://farm1.staticflickr.com/349/19659604440_bc370c6e23_o.jpg",
        title: "Panerai Luminor Marina",
        url: ""
    },
    {
        src: "https://farm1.staticflickr.com/297/19712709261_dba045cff8_o.jpg",
        title: "Henry Juskevicius Solid Watch",
        url: "http://kck.st/jg4BRI"
    },
    {
        src: "https://farm1.staticflickr.com/388/19520112118_3b50180d53_o.jpg",
        title: "Issey Miyake TO",
        url: "http://www.isseymiyake-watch.com/eg/to_automatic/detail.html"
    },
];

var imgarray = [];
    
for(var p in images) {
    imgarray.push(images[p].src);
}

var slideshow = new Carousel();
    slideshow.debug = false;
    slideshow.loop = true;
    slideshow.clickable = false;
    slideshow.arrows = {
        size: 100,
        margin: -20
    };
    slideshow.arrows.margin = -10;
    slideshow.mode = 0;
    slideshow.screenflow = {
        width: 480,
        height: 480,
        buffer: -100,
        smaller: 0.7,
        fade: 0.7
    };
    
    slideshow.callback_show = function() {
        console.log( images[slideshow.currentSlide].title );
    };

    slideshow.callback_click = function() {
        window.open( images[slideshow.currentSlide].url );
    };

    // slideshow.slide = 'contain';
    slideshow.init(document.getElementById('slideshow'), imgarray);
