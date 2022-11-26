/**
 * RImager
 * (c) 2020 - Robert Rajs
 */
class RImager {

    constructor(
        selector,
        imgFiles,
        duration,
        anispeed
    ) {
        this.selector   = selector;
        this.imgFiles   = imgFiles;
        this.duration   = duration;
        this.anispeed   = anispeed;
        this.cursor     = 0;
        this.imgsLoaded = 0;

        var that = this;
        $(document).ready(function() {
            that.init();
        });
    }

    init() {
        this.createTag();
        this.loadedInit();
        this.preloadImgs();
    }

    createTag() {
        $(this.selector).html("<div></div>");
        $(this.selector + " div").css({
            position: "relative",
            width: "100%",
            height: "100%",
            opacity: "0",
            overflow: "hidden"
        });

        $(this.selector + " div").html("<div class='rimg'></div>");
        $(this.selector + " .rimg").css({
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            // backgroundImage: "url('media/01.jpg')",
            scale: "1"
        });
    }
    
    show() {
        this.scaleMotion();
        this.imgSwitcher();
        $(this.selector + " div").transition({
            opacity: "1"
        },this.anispeed);
    }

    imgSwitcher() {
        var i;
        var that = this;
        
        $(this.selector + " .rimg").css({
            backgroundImage: "url('" + this.imgFiles[this.cursor] + "')"
        });
        if (this.cursor < this.imgFiles.length - 1) {
            this.cursor++;
        } else {
            this.cursor = 0;
        }
        
        if (this.imgFiles.length > 1) {
            i = setInterval(function() {
                
                $(that.selector).first("div").transition({
                    transform: "rotateY(90deg)"
                },that.anispeed / 2,function() {
                    $(that.selector + " .rimg").css({
                        backgroundImage: "url('" + that.imgFiles[that.cursor] + "')"
                    });
                    $(this).transition({
                        transform: "rotateY(0deg)"
                    },that.anispeed / 2);
                });
                
                if (that.cursor < that.imgFiles.length - 1) {
                    that.cursor++;
                } else {
                    that.cursor = 0;
                }
    
            },that.duration);
        }

    }

    scaleMotion() {
        var i;
        var t;
        var that = this;

        t = Math.round(Math.random() * that.anispeed * 2);
        console.log(t);
        i = setInterval(function() {
            $(that.selector + " .rimg").css({
                scale: 1.05 + ((Math.sin(t / (that.anispeed * 2)) / 20))
            });
            t++;
        });
    }

    loadedInit() {
        var interval;
        var that = this;

        interval = setInterval(function() {
            if (that.imgsLoaded = that.imgFiles.length) {
                that.consoleAlert("Máme všechny obrázky!");
                clearInterval(interval);
                that.show();
            }
        });
    }

    consoleAlert(alert) {
        var alert;
        console.log("[RImager " + this.selector + "]",alert);
    }

    preloadImgs() {
        var img = new Array;
        var that = this;

        $(this.imgFiles).each(function(key) {
            img[key] = new Image();
            img[key].src = this;
            img[key].onload = function() {
                that.imgsLoaded += 1;
            }
        });

    }

}
