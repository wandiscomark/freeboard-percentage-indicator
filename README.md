# freeboard-percentage-indicator

A way to display a percentage using a bar. 

It will animate on value changes. 
It accepts integers as the values. 

Install - same as any other plugin, include the js file so freeboard can load it,
/plugins/percentbar/ 
is what i'm using. 
 
eg in index.html: 

   head.js("/js/freeboard_plugins.min.js",
                         '/plugins/percentbar/percentbar.js',
                         ... 

It should then appear in the dropdown menu of available widget types
It will add its own style.css file, make sure it's in /plugins/percentbar/style.css 

See example.png to see what it looks like, imagine the lovely animations (using css transitions) 


When adding a widget, make sure you use a unique id name for it. 

The available badge-classes are : 

pbadge-purple
pbadge-blue 
pbadge-grey
pbadge-lightblue
pbadge-lightgreen
pbadge-yellow
pbadge-red
pbadge-orange

but you can always add your own. 

