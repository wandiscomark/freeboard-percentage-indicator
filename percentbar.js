(function () {

    var percentBarWidget = function (settings) {


        var self = this;

        var currentSettings = settings;
        var displayElement = $('<div class="tw-display"></div>');
        var titleElement = $('<h2 class="section-title tw-title tw-td"></h2>');
        var valueElement = $('<div class="tw-value"></div>');
        var unitsElement = $('<div class="tw-unit"></div>');
        var chartid = 'percentbarone';
        var titlebadges = true;
        var titleclass = 'badge-red';
        var currentValue = 0;
        var percentValue = 0;

        function updateValueSizing()
        {
            if(!_.isUndefined(currentSettings.units) && currentSettings.units != "") // If we're displaying our units
            {
                valueElement.css("max-width", (displayElement.innerWidth() - unitsElement.outerWidth(true)) + "px");
            }
            else
            {
                valueElement.css("max-width", "100%");
            }
        }

        this.render = function (element) {
            $(element).empty();
            $(element).append('<link rel="stylesheet" href="/plugins/percentbar/style.css" />');

            percent = Math.floor(Math.random(0, 100) * 100);
            percent = percentValue;
            id = 'percentbarone';
            if (chartid.length) {
                id = chartid;
            }
            var node = document.createElement("div");
            node.className = 'percentredbg';
            var inner = document.createElement("div");
            inner.className = 'percentgreenbg';
            inner.id = id;
            inner.innerHTML = percent + "%";
            inner.style.width = '1%';
            inner.style.width = '0%';
            node.appendChild(inner);
            $(displayElement).append(titleElement).append(node);
            $(element).append(displayElement);
            updateValueSizing();
        }

        this.onSettingsChanged = function (newSettings) {
            currentSettings = newSettings;

            var shouldDisplayTitle = (!_.isUndefined(newSettings.title) && newSettings.title != "");
            var shouldDisplayUnits = (!_.isUndefined(newSettings.units) && newSettings.units != "");
            if(newSettings.chartid){
                chartid = newSettings.chartid;
            }
            if(newSettings.titlebadges){
                titlebadges = newSettings.titlebadges;
                titleclass = newSettings.titleclass;
                titleElement = $('<span class="percentbarbadge ' + titleclass + '"></span>');
            }
            if(newSettings.titleclass){
                titleclass = newSettings.titleclass;
                titleElement = $('<span class="percentbarbadge ' + titleclass + '"></span>');
            }
            if(shouldDisplayTitle)
            {
                titleElement.html((_.isUndefined(newSettings.title) ? "" : newSettings.title));
                titleElement.attr("style", null);
            }
            else
            {
                titleElement.empty();
                titleElement.hide();
            }

            if(shouldDisplayUnits)
            {
                unitsElement.html((_.isUndefined(newSettings.units) ? "" : newSettings.units));
                unitsElement.attr("style", null);
            }
            else
            {
                unitsElement.empty();
                unitsElement.hide();
            }

            var valueFontSize = 30;

            if(newSettings.size == "big")
            {
                valueFontSize = 75;

            }

            valueElement.css({"font-size" : valueFontSize + "px"});

            updateValueSizing();
        }

        this.onSizeChanged = function()
        {
            updateValueSizing();
        }

        this.updateBarWidth = function(id, value)
        {
            document.getElementById(id).style.width = 100 + "%";
            document.getElementById(id).innerHTML= value +"%";
            setTimeout('document.getElementById("'+id+'").style.width='+Math.floor(value)+'+"%"; ', 100);
        }

        this.onCalculatedValueChanged = function (settingName, newValue) {

            this.updateBarWidth(settings.chartid, newValue)   ;

        }

        this.onDispose = function () {

        }

        this.getHeight = function () {
            if (currentSettings.size == "big" ) {
                return 2;
            }
            else {
                return 1;
            }
        }

        this.onSettingsChanged(settings);


        function easeTransitionText(newValue, textElement, duration) {

            var currentValue = $(textElement).text();

            if (currentValue == newValue)
                return;

            if ($.isNumeric(newValue) && $.isNumeric(currentValue)) {
                var numParts = newValue.toString().split('.');
                var endingPrecision = 0;

                if (numParts.length > 1) {
                    endingPrecision = numParts[1].length;
                }

                numParts = currentValue.toString().split('.');
                var startingPrecision = 0;

                if (numParts.length > 1) {
                    startingPrecision = numParts[1].length;
                }

                jQuery({transitionValue: Number(currentValue), precisionValue: startingPrecision}).animate({transitionValue: Number(newValue), precisionValue: endingPrecision}, {
                    duration: duration,
                    step: function () {
                        $(textElement).text(this.transitionValue.toFixed(this.precisionValue));
                    },
                    done: function () {
                        $(textElement).text(newValue);
                    }
                });
            }
            else {
                $(textElement).text(newValue);
            }
        }


    };

    freeboard.loadWidgetPlugin({
        type_name: "percent_bar_widget",
        display_name: "PercentBar",
        "external_scripts" : [
            "plugins/thirdparty/jquery.sparkline.min.js"
        ],
        settings: [
            {
                name: "title",
                display_name: "Title",
                type: "text"
            },
            {
                name: "value",
                display_name: "Value",
                type: "calculated"
            },
            {
                name: "chartid",
                display_name: "Chart ID (unique, no spaces)",
                type: "text"
            },
            {
                name: "titlebadges",
                display_name: "Title Badges",
                type: "boolean",
                default_value:true,
            },
             {
                name: "titleclass",
                display_name: "Title Badge class",
                type: "text",
                default_value:"pbadge-red",
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new percentBarWidget(settings));
        }
    });

}());
