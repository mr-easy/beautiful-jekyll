---
layout: post
title: "Programming Gale-Shapley Algorithm in C++"
description: Programming Gale-Shapley Algorithm in C++ for stable marriage problem.
date: 2018-08-19
categories: post
tags: [Blog, CP, C++, Algorithm]
---


We will be writing program for Gale-Shapley Algorithm in C++. This algorithm is used to solve the <b>Stable Marriage Problem</b>. <br />
You can get the problem on [SPOJ](https://www.spoj.com/problems/STABLEMP/),
or on [codechef](https://www.codechef.com/problems/STABLEMP). <br />
You can understand the algorithm from Gale-Shapley's paper: <a href="http://www.eecs.harvard.edu/cs286r/courses/fall09/papers/galeshapley.pdf">College Admissions and the Stability of Marriage</a>


<h3>The Algorithm</h3>
<p>The algorithm is as follows:</p>
{% highlight c++ %}
1. set all men and women to be free.
2. while there is a man who is free.
    2.1 select this free man m.
    2.2 m proposes to the woman w which is at his highest preference and he has not proposed to her yet.
    2.3 if w is free, then engage m and w.
    2.4 else if w is engaged with someone who is she prefers less than w, then engage m and w and set w's previous partner to be free.
    2.4 else w is engaged to someone who she prefers more than m, so let m remain free.
3. output the final engagements.
{% endhighlight %}

<h3>Taking the input</h3>
<p>
So first, we will take our input. All the men are numbered from 1 to n. And all women are also numbered 1 to n. We will save the preference list as a 2d array for men(mList) and for women(wList).
</p>
{% highlight c++ %}
mList[i][j] = k
{% endhighlight %}
<p>
means that ith man's jth preference is woman k <br />
for example if mList[2][1] = 3, that means man 2 's 1st preference is woman 3. <br />
And similarly for wList.
</p>

<p>
Since we are numbering man and woman from 1 to n, we will create our arrays of n+1 size, and not bother what is stored at index 0.
</p>

{% highlight c++ linenos=table %}
#include <stdio.h>
#define SINGLE 0
int main() {
    int t, n;
    scanf("%d", &t);                           // number of test cases
    while(t--) {
        scanf("%d", &n);
        int mList[n+1][n+1];                   // men's preference list
        int wList[n+1][n+1];                   // women's preference list
        int manCurrentMatch[n+1];              // current match of men
        int womanCurrentMatch[n+1];            // current match of men
        int manNextProposal[n+1];              // each man will propose this indexed woman in his preference list

        //taking inputs...
        for (int i = 1; i <= n; i++) {         // for each woman
            womanCurrentMatch[i] = SINGLE;     // set her to be single
            for(int j = 0; j <= n; j++) {
                scanf("%d", &wList[i][j]);
            }
        }

        for (int i = 1; i <= n; i++) {         // for each man
            manCurrentMatch[i] = SINGLE;       // set him to be single
            manNextProposal[i] = 1;            // each man will start by proposing 1st woman in his list
            for(int j = 0; j <= n; j++) {
                scanf("%d", &mList[i][j]);
            }
        }

        //algorithm...

        //show output...

    }

    return 0;
}
{% endhighlight %}

<p>
Here manCurrentMatch is an array which stores the current engagement of every man, or set it to 0 if he is currently single.</p>
{% highlight c++ %}
manCurrentMatch[i] = k
{% endhighlight %}
<p>means that currently man i is engaged to woman k. Similarly we have womanCurrentMatch array.<br />
While taking the input we are also setting the all the manCurrentMatch and womanCurrentMatch as SINGLE, which is defined to be 0(since there is no woman or man numbered 0).
</p>

<p>
manNextProposal is an array which tells that which indexed woman this man will propose next in his prefernce list.</p>
{% highlight c++ %}
manNextProposal[i] = k
{% endhighlight %}
<p>means that man i will propose woman mList[i][k] next.<br />
So at the begining, every man will propose to their first choice, so manNextProposal[i] = 1 for every man i.
</p>

<h3>While Loop</h3>
<p>
Now, at each iteration of the while loop, we need to check if there is any free man available. Boolean freeManAvailable will be used for this purpose. At the very first iteration freeManAvailable will be true (because all men are free at the starting).<br />
And at the end of each iteration, we will check again for a free man, if available then set freeManAvailable to true and take that free man into our variable m. At begining we set m = 1, i.e. we used man 1 as our first free man who will propose in first iteration of while loop.
</p>

{% highlight c++ linenos=table %}
    ...
    //algorithm...
    bool freeManAvailable = true;           // at begining we have free man available
    int m = 1;                              // taking the first man as free for first iteration
    while(freeManAvailable) {
        freeManAvailable = false;
        int w = mList[m][manNextProposal[m]++];  // the woman man proposes
        if(womanCurrentMatch[w] == SINGLE) {
            //w is currently free, engage (m and w)...

        } else {
            //w is engaged...

        }

        //finding a new free man...
        for(int x = 1; x <= n; x++) {
            if(manCurrentMatch[x] == SINGLE) {
                m = x;
                freeManAvailable = true;
                break;
            }
        }
    }

    ...
{% endhighlight %}

<p>
We can get the woman w, whom our man m will propose by:</p>
{% highlight c++ %}
w = mList[m][manNextProposal[m]++];
{% endhighlight %}
<p>
Here we are also incrementing the manNextProposal[m], this means that he will propose his next preferenced woman(if such a condition arises at some later time).
</p>

<p>
We will first check if woman w is currently single, if she is, then engage m and w.
</p>

{% highlight c++ linenos=table %}
    ...
    if(womanCurrentMatch[w] == SINGLE) {
        //w is currently free, engage (m and w)...
        womanCurrentMatch[w] = m;
        manCurrentMatch[m] = w;
    } else {
        //w is engaged...

    }
    ...
{% endhighlight %}

<p>
If woman w is not free, then we need to check if her current match is more prefered by her than m or not.
</p>

{% highlight c++ linenos=table %}
    ...
    if(womanCurrentMatch[w] == SINGLE) {
        //w is currently free, engage (m and w)...
        womanCurrentMatch[w] = m;
        manCurrentMatch[m] = w;
    } else {
        //w is engaged...
        bool itsABetterProposal = false;     // check if it's a better proposal
        //check her preference list
        for(int y = 1; y <= n; y++) {
            if(wList[w][y] == womanCurrentMatch[w]) {
                itsABetterProposal = false; break;
            }
            if(wList[w][y] == m) {
                itsABetterProposal = true; break;
            }
        }
        if(itsABetterProposal) {
            // if a better proposal, then engage (m and w), and set w's previous partner as free...
            manCurrentMatch[womanCurrentMatch[w]] = SINGLE;
            womanCurrentMatch[w] = m;
            manCurrentMatch[m] = w;
        }
    }
    ...
{% endhighlight %}

<p>
Finally we will show the output as mentioned in the problem statement. And here is the final code.
</p>

{% highlight c++ linenos=table %}
#include <stdio.h>
#define SINGLE 0
int main() {
    int t, n;
    scanf("%d", &t);                           // number of test cases
    while(t--) {
        scanf("%d", &n);
        int mList[n+1][n+1];                   // men's preference list
        int wList[n+1][n+1];                   // women's preference list
        int manCurrentMatch[n+1];              // current match of men
        int womanCurrentMatch[n+1];            // current match of men
        int manNextProposal[n+1];              // each man will propose this indexed woman in his preference list

        //taking inputs...
        for (int i = 1; i <= n; i++) {         // for each woman
            womanCurrentMatch[i] = SINGLE;     // set her to be single
            for(int j = 0; j <= n; j++) {
                scanf("%d", &wList[i][j]);
            }
        }

        for (int i = 1; i <= n; i++) {         // for each man
            manCurrentMatch[i] = SINGLE;       // set him to be single
            manNextProposal[i] = 1;            // each man will start by proposing 1st woman in his list
            for(int j = 0; j <= n; j++) {
                scanf("%d", &mList[i][j]);
            }
        }

        //algorithm...
        bool freeManAvailable = true;           // at begining we have free man available
        int m = 1;                              // taking the first man as free for first iteration
        while(freeManAvailable) {
            freeManAvailable = false;
            int w = mList[m][manNextProposal[m]++];  // the woman man proposes
            if(womanCurrentMatch[w] == SINGLE) {
                //w is currently free, engage (m and w)...
                womanCurrentMatch[w] = m;
                manCurrentMatch[m] = w;
            } else {
                //w is engaged...
                bool itsABetterProposal = false;     // check if it's a better proposal
                //check her preference list
                for(int y = 1; y <= n; y++) {
                    if(wList[w][y] == womanCurrentMatch[w]) {
                        itsABetterProposal = false; break;
                    }
                    if(wList[w][y] == m) {
                        itsABetterProposal = true; break;
                    }
                }
                if(itsABetterProposal) {
                    // if a better proposal, then engage (m and w), and set w's previous partner as free...
                    manCurrentMatch[womanCurrentMatch[w]] = SINGLE;
                    womanCurrentMatch[w] = m;
                    manCurrentMatch[m] = w;
                }
            }

            //finding a new free man...
            for(int x = 1; x <= n; x++) {
                if(manCurrentMatch[x] == SINGLE) {
                    m = x;
                    freeManAvailable = true;
                    break;
                }
            }
        }

        //show output...
        for(int i = 1; i <= n;  i++) {
            printf("%d %d\n", i, manCurrentMatch[i]);
        }
    }

    return 0;
}
{% endhighlight %}