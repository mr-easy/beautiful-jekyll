---
layout: post
title: "Implementing Gibbs Sampling in Python"
description: Programming Gibbs Sampling sampler in python for 2D Gaussian distribution and visualizing it.
date: 2018-08-19
categories: post
tags: [Blog, Probability, Visualization, Python]
---

Suppose we have a joint distribution P on multiple random variables which we can't sample from directly. But we require the samples. One way is to use MCMC, and a special and simple example of MCMC is Gibbs sampling. Where we know that sampling from P is hard, but sampling from conditional distribution of one variable at a time conditioned on rest of the variables is simpler. And it's possible because sampling from 1D distributions is simpler in general. 

For keeping things simple, we will programm Gibbs sampling for simple 2D Gaussian distribution. Albeit its simple to sample from multivariate Gaussian distribution, but we'll assume that it's not and hence we need to use some other method to sample from it, i.e., Gibbs sampling.

Let our original distribution for which we need to sample be P = N(\mu, \Sigma). \mu \in \R^2 be the mean vector and \Sigma \in \R^{2x2} is the symmetric positive semi-definite covariance matrix. And each of the sample will be x = [x_0, x_1]^T

\mu = [] \Sigma = 

For Gibbs sampling, we need to sample from the conditional of one variable, given the values of all other variables. So in our case, we need to sample from p(x_0|x_1) and p(x_1|x_0) to get one sample from our original distribution P. So, our main sampler will contain two simple sampling from these conditional distributions:

\code
def gibbs_sampler(x):
    # Sample from p(x_0|x_1)
    x[0] = conditional_sampler(sampling_index=0, x)
    # Sample from p(x_1|x_0)
    x[1] = conditional_sampler(sampling_index=1, x)
    return x

Now we need to write functions to sample from 1D conditional distributions. Remember that in Gibbs sampling we assume that although the original distribution is hard to sample from, but the conditional distributions of each variable given rest of the variables is simple to sample from. 

Mutivariate Gaussian has the characteristic that for a multivariate Gaussian, the conditional distributions are also Gaussian (and the marginals too). For the proof, interested readers can refer to Chapter 3 of PRML book by C.Bishop. 

For the 2D case, the conditional distribution of x_0 given x_1 is single variable Gaussian:
 p(x_0 | x_1) ~ N(\mu_1, ...)

And similarly for p(x_1 | x_0)
 p(x_1 | x_0)

Because they are so similar, we can use just one function for both of them. We used numpy's random.randn() which gives a sample from standard normal, we transform it by multiplying with standard deviation and shifting it by the mean of out distribution. The following function is the implementation of above equations and gives us sample from these distributions.

{% highlight python %}
def conditional_sampler(sampling_index, current_x, mean, cov):
    conditioned_index = 1 - sampling_index   # Because we only have 2 variables, x_0 and x_1
    a = cov[sampling_index, sampling_index]
    b = cov[sampling_index, conditioned_index]
    c = cov[conditioned_index, conditioned_index]
    
    mu = mean[sampling_index] + (b * (current_x[conditioned_index] - mean[conditioned_index]))/c
    sigma = np.sqrt(a-(b**2)/c)
    new_x = np.copy(current_x)
    new_x[sampling_index] = np.random.randn()*sigma + mu
    return new_x
{% endhighlight %}

Now we can sample as many points as we want, starting from an inital point:

point = [0, 0]   # our initial starting point
samples = [point] # list of our collected samples
num_samples = 100
for i in range(num_samples):
    samples.append(gibbs_sample(x, mu, sigma))

Let's see it in action. First let's plot our true distribution, which lets say have the following parameters
\mu =  \Sigma = 

\plot of true distribution

Let's begin sampling! And also we will estimate a gaussian from the sampled points to see how close we get with more samples.
\plt
The complete code for this example along with all the plotting and creating GIFs is available at my repo. For plotting Gaussian contours, I used the code from <>



-------------------------------------------------------------------------------------------------

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