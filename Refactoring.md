# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The main changes I made were to remove the nested ifs. Those are generally hard to read, and in this particular example they were quite complicated as there were two nested ifs, which made following each variable complicated. What I did was first look at all possible paths the function could take to each individual result, then I created tests for each of those. I then used those tests to refactor the code. What I did was first take care of the early returns, such as a missing event or partitionKey. Then if a key is provided, we use it, stringify it and just check its length. I also added comments for clarity, and moved the constants outside of the function so it's clear those are set values.