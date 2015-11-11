# pattern-association
Simulation of pattern association in neural networks
![Working model](https://github.com/theotherdy/pattern-association/blob/master/PatternAssociation.png "Working model")
##Theory
Based on Daniel Walter's Lecture notes: https://github.com/jonmase/pattern-association/blob/master/content/files/Lecture3.pdf (slide 13 onwards for the most relevant parts)
##Style Guide
https://github.com/johnpapa/angular-styleguide
##File Structure
/content - files, images etc
/scripts - all js
  /lib - libraries, plugins etc, e.g. angular, bootstrap, modernizr (not currently used), jquery (not currently used)
  /controllers - angular controllers (learning and recall)
  /services - angular services (learning and recall), plus contants.js
/styles - css, fonts etc. /css/style.css containts the custom styles.
/views - view partials (learning.html and recall.html)
##Code Structure
app.js just defines the pattern module and it's dependencies (pattern.learning and pattern.recall)
index.html loads all of the css, scripts etc and contains divs that include the learning and recall views.
LearningController basically just passes variables to the view, and exposes methods in the view, although the methods just call methods in the learningFactory (which is injected into LearningController). learningFactory does all the work, and exposes the necessary methods. learningFactory has the cols and rows contants (from constants.js) injected.

