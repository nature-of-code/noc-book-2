# Errata

This page tracks errors that have been corrected since the September 3, 2024 publication date. These errors have been corrected in the website version of the book, but not the print edition.

## Introduction

- New p5.js "Get Started" link: https://p5js.org/tutorials/get-started/, [#1005](https://github.com/nature-of-code/noc-book-2/issues/1005)

## Chapter 0

- minus signs were en dashes in the code in the `step()` function related to floating point numbers, [#1037](https://github.com/nature-of-code/noc-book-2/issues/1037)
- Exercise 0.1 - changed to "A partial solution..." [#1034](https://github.com/nature-of-code/noc-book-2/issues/1034)
- I have rewritten three paragraphs to be more accurate to the history of Perlin noise and the `noise()` function in Processing and p5.js. The revised text can be found in [this comment on issue #1057](https://github.com/nature-of-code/noc-book-2/issues/1057#issuecomment-2610234040)

## Chapter 1

- "Referring back to Exercise 0.6" -> Example 0.6, "[#979](https://github.com/nature-of-code/noc-book-2/pull/979)
- Figure 1.16, `dx = mouseY - y` should be `dy = mouseY - y` [#1056](https://github.com/nature-of-code/noc-book-2/pull/1056), [#981](https://github.com/nature-of-code/noc-book-2/issues/981)

## Chapter 2

- "Now it's time for most important law for you, the p5.js coder: Newton's second law.", missing "**the** most important law" [#1059](https://github.com/nature-of-code/noc-book-2/issues/1059)
- `force.div(mass)` should be `force.div(this.mass)` in "Factoring in Mass" section [#1081](https://github.com/nature-of-code/noc-book-2/pull/1081)
- n-body section, `movers` change to `bodies`, `return force` instead of `applyForce()` [#1095](https://github.com/nature-of-code/noc-book-2/issues/1095) [#1108](https://github.com/nature-of-code/noc-book-2/pull/1108)
- `drag()` should be `calculateDrag()` in the paragraph explanation about the `Liquid` class. [#1105](https://github.com/nature-of-code/noc-book-2/pull/1105), [#1086](https://github.com/nature-of-code/noc-book-2/issues/1086)

## Chapter 3

- "Think about what’s going here." -> "Think about what’s going on here.", [#968](https://github.com/nature-of-code/noc-book-2/pull/968)
- `circle(-60, 0, 16, 16);` should be `circle(-60, 0, 16);` in code snippet right before Example 3.1 [#1067](https://github.com/nature-of-code/noc-book-2/pull/1067)
- Figure 3.8 caption should be (-4, 3) and v2 is (4, -3). [#1096](https://github.com/nature-of-code/noc-book-2/issues/1096) [#1108](https://github.com/nature-of-code/noc-book-2/pull/1108)

## Chapter 4

- missing `this.` in Example 4.3 snippet (`this.origin.x, this.origin.y`). [#1070](https://github.com/nature-of-code/noc-book-2/issues/1070)

## Chapter 8

- Changing the text about the Mandelbrot set to reference the Coding Train challenge page, see: [#1046](https://github.com/nature-of-code/noc-book-2/issues/1046)
- move `generate()` to after drawing the text in Example 8.8. [#1105](https://github.com/nature-of-code/noc-book-2/pull/1105) [#1105](https://github.com/nature-of-code/noc-book-2/pull/1105), [#1087], [https://github.com/nature-of-code/noc-book-2/issues/1087]
- In the discussion before Example 8.9 to be consistent with the text, the "move forward line" in the table should be `line(0, 0, length, 0);` `translate(length, 0);` [#1105](https://github.com/nature-of-code/noc-book-2/pull/1105), [#1089](https://github.com/nature-of-code/noc-book-2/issues/1089)

## Chapter 9

- "Coding the Genetic Algorithm" needs a population size, hard coding it for now. [#1104](https://github.com/nature-of-code/noc-book-2/issues/1104) [#1108](https://github.com/nature-of-code/noc-book-2/pull/1108)
- Step 2: Selection table "0.1" -> "0.15", [#968](https://github.com/nature-of-code/noc-book-2/pull/968)


## Chapter 10

- "finshedTraining" -> "finishedTraining", [#1028](https://github.com/nature-of-code/noc-book-2/issues/1028)
