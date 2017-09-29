# Conway's Game of Life
*React, CSS, JSX*

### Purpose
[Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) is a math "game" that represents the life through successive generations. Each cell in the board, and cell "live" and "die through each iteration according to the number of neighbors each one has. Too many or too few, and a cell will die. Howevever if the number of neighbor is just right, a cell will live on, or even take root where no cell lived before. The gampeplay is determined by it's inital state, it represents the tension between chaos and stability in a closed system. 

### Controls
The game play automatically on page load. Users can set the size of the grid, the density of "live" squares, and the rate of successive iterations. Settings are applied once the game has been reset.

### Reflection
Out of all my coding projects, this has been the one I enjoyed the most. The elegance of the problem stumped me at first, but it also drew me in. I don't have a professional background in math, but I find myself incredibly engaged every time I have to find the solution to a programming problem mathematically. 

I was able to isolate my logic in container componets, and layout in presentational componets, and doing so really helped to structure my thinking about how to organize my code. I also tried adding two libraries that were immensely helpful: [styled-components](https://www.styled-components.com/) and [pretteier](https://prettier.io/). I also followed the practice of adding every new feature in its own branch.

### Next steps
* Add media queries for different screen sizes
* Revisit the syntax & organization of props
* Add a visual indicator for 'start/pause'