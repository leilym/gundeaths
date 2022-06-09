# Gun Deaths in 2017 – CS465 Information Visualization Mini-Project
## By Leili Manafi and John Cambefort

**The visualization can be viewed [here](https://leilym.github.io/gundeaths/).**

### Description

This exploratory visualization shows victims killed by an offender wielding a gun in 2017. The data itself contains a random sample of 500 victims from the original dataset available [here](https://guns.periscopic.com/). The visualizations allows the exploration of victim sex, victim age (encoded in the bubble sizes), the weapon used, and the relationship between the victim and the offender.

### Design Rationale

- We opted to go with a random sample of 500 individuals from the original dataset, because any more bubbles than that would have made the graph 'explode' and look confusing. 

- We also wanted to include victim age somehow, and opted to encode this in the circle radius. We decided to represent younger victims by larger bubbles, and vice versa. In a way, there is a feeling that the crime is even more attrocious for young victims who have yet to live a life, and so highlighting these with larger circles seems right. This was a design choice.

- We initially started with visualizing the bubbles on the screen -- creating the svg, the circles, etc. Then implemented forces to have the bubbles move around the screen without overlapping. We used `forceCollide()`, `forceManybody()`, and `forceX()` and `forceY()` for positioning the bubbles. We then initially tried to get one variable grouping (relationship) to work, then moved on to the other two.

- In order to include several 'states' [multiple boxes ticked] we used an array `currentStates` that, when checking a box, appends it to the list, and the data grouping functions are called depending on which states are in the array (i.e., which boxes are ticked).

- Once the groupings worked, we added the labels, and "axis". There was quite a bit of fineaggling with the force strengths and alpha values to allow the bubbles to form into natural groupings using D3's simulation engine.

- Lastly, we included tooltips. For these, we have `showTooltip()` and `hideTooltip()` which are triggered on `mouseover` and `mouseout` event for the nodes (bubbles).


### Overall process

It's crazy how easily we can take certain things for granted while building these visualizations. It was only after showing the graph to a friend that I noticed we hadn't explained the size encoding of the bubbles (the greater the bubble, the younger the victim at the time of death).

It was definately a good combination of skills we had built and we had to wrap our heads around. We had challenges with using the right force functions and strengths. We were sad that we had to cut the data a lot because the accuracy would have definately been way more with a bigger data set. 

We also had a minor error that took us more than it should have to figure out, which was that the age is a string, and the circle's radius was being passed as NaN. Also, we thought we had to do some math to get the right radius depending on the age--but using scaleSqrt() and having the range be from high to low, was sufficient.

In general, it was a rewarding process, and the results are shocking and unfortunate. How there are more females within family relationship that have been victims, as well as how most of the victims are young.

One last issue we have that we couldn't solve was that, the use of '\n' in text elements located in our SVG to produce line breaks (e.g. Relationship category labels) [is not supported by the Google Chrome browser](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space#browser_compatibility). We didn't know of a better way to do this or get around the issue, so we recommend that anyone view this graphic in Firefox.

### Critique & Wish-List

It would have been great if, upon ticking the "Sex" checkbox, we could add a couple of additional simulations that would cause the differently-colored bubbles to be attracted to each other (so all the bubbles colored in blue within the group visualized would be attracted to one another, and vice versa for pink). Unfortunately we ran out of time and into finals week.

[John] I felt a little self-conscious when I chose the colors blue and pink for Male/Female sex. I realize we've been raised and 'socialized' to identify more closely with certain genders based on our birth sex, and that color has been used to play into that (e.g. the old "boys get blue cars and girls get pink dolls" phenomena), and I felt like I was perpetuating that somewhat here. On the other hand, this option offered a sense of clarity and something that viewers would probably immediately understand. It almost warrants not needing to explicitly specify which sex the colors represent. I'd be curious to learn more in general about the use of certain encodings in sometimes ethically-questionable ways...

[Leili] I tried to have the tooltips show on top of the circles, with mouseHover, however I didn't succeed in doing so. It is a bit difficult to hover over circles at the top and have to read the info at the bottom, which is slightly hidden away.

Thank you to Middlebury College Professor Christopher Andrews for some of the base HTML & CSS layouts, and for the course as a whole!
