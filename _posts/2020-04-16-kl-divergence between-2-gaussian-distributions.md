---
layout: post
title: "KL Divergence between 2 Gaussian Distributions"
description: KL Divergence between two Gaussian distribution or Normal distribution, Probability.
image: /files/blog/kl/front.jpg
date: 2020-04-16
categories: post
tags: [Blog, Probability]
---

## What is the KL (Kullback–Leibler) divergence between two multivariate Gaussian distributions?

[KL divergence](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence) between two distributions $$P$$ and $$Q$$ of a continuous random variable is given by:

$$ D_{KL}(p||q) = \int_x p(x) \log \frac{p(x)}{q(x)} $$

And probabilty density function of [multivariate Normal distribution](https://en.wikipedia.org/wiki/Multivariate_normal_distribution) is given by:

$$ p(\mathbf{x}) = \frac{1}{(2\pi)^{k/2}|\Sigma|^{1/2}} \exp\left(-\frac{1}{2}(\mathbf{x}-\boldsymbol{\mu})^T\Sigma^{-1}(\mathbf{x}-\boldsymbol{\mu})\right) $$

Now, let our two Normal distributions be $$\mathcal{N}(\boldsymbol{\mu_p},\,\Sigma_p)$$ and $$\mathcal{N}(\boldsymbol{\mu_q},\,\Sigma_q)$$, both $$k$$ dimensional.

$$
\begin{aligned}
D_{KL}(p||q) & = \mathbb{E}_p\left[\log(p) - \log(q)\right]
\newline
& = \mathbb{E}_p\left[\frac{1}{2}\log\frac{|\Sigma_q|}{|\Sigma_p|} - \frac{1}{2}(\mathbf{x}-\boldsymbol{\mu_p})^T\Sigma_p^{-1}(\mathbf{x}-\boldsymbol{\mu_p}) + \frac{1}{2}(\mathbf{x}-\boldsymbol{\mu_q})^T\Sigma_q^{-1}(\mathbf{x}-\boldsymbol{\mu_q})\right]
\newline
& = \frac{1}{2}\mathbb{E}_p\left[\log\frac{|\Sigma_q|}{|\Sigma_p|}\right] - \frac{1}{2}\mathbb{E}_p\left[(\mathbf{x}-\boldsymbol{\mu_p})^T\Sigma_p^{-1}(\mathbf{x}-\boldsymbol{\mu_p})\right] + \frac{1}{2}\mathbb{E}_p\left[(\mathbf{x}-\boldsymbol{\mu_q})^T\Sigma_q^{-1}(\mathbf{x}-\boldsymbol{\mu_q})\right]
\newline
& = \frac{1}{2}\log\frac{|\Sigma_q|}{|\Sigma_p|} - \frac{1}{2}\mathbb{E}_p\left[(\mathbf{x}-\boldsymbol{\mu_p})^T\Sigma_p^{-1}(\mathbf{x}-\boldsymbol{\mu_p})\right] + \frac{1}{2}\mathbb{E}_p\left[(\mathbf{x}-\boldsymbol{\mu_q})^T\Sigma_q^{-1}(\mathbf{x}-\boldsymbol{\mu_q})\right] 
\end{aligned}
$$


Now, since $$(\mathbf{x}-\boldsymbol{\mu_p})^T\Sigma_p^{-1}(\mathbf{x}-\boldsymbol{\mu_p})$$ in the second term $$ \in \mathbb{R} $$, we can write it as $$tr\left\{(\mathbf{x}-\boldsymbol{\mu_p})^T\Sigma_p^{-1}(\mathbf{x}-\boldsymbol{\mu_p})\right\}$$, where $$tr\{\}$$ is the trace operator. And using the trace trick (eq 16 of section 1.1 from [Matrix Cookbook](https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf)), we can write it as $$tr\left\{(\mathbf{x}-\boldsymbol{\mu_p})(\mathbf{x}-\boldsymbol{\mu_p})^T\Sigma_p^{-1}\right\}$$.

The second term now is,

$$ = \frac{1}{2}\mathbb{E}_p\left[tr\left\{(\mathbf{x}-\boldsymbol{\mu_p})(\mathbf{x}-\boldsymbol{\mu_p})^T\Sigma_p^{-1}\right\}\right]$$

The expectation and trace can be interchanged to get,

$$
\begin{aligned}
& = \frac{1}{2}tr\left\{\mathbb{E}_p\left[(\mathbf{x}-\boldsymbol{\mu_p})(\mathbf{x}-\boldsymbol{\mu_p})^T\Sigma_p^{-1}\right]\right\}
\newline
& = \frac{1}{2}tr\left\{\mathbb{E}_p\left[(\mathbf{x}-\boldsymbol{\mu_p})(\mathbf{x}-\boldsymbol{\mu_p})^T\right]\Sigma_p^{-1}\right\}
\end{aligned}
$$

We know $$\mathbb{E}_p\left[(\mathbf{x}-\boldsymbol{\mu_p})(\mathbf{x}-\boldsymbol{\mu_p})^T\right] = \Sigma_p $$. Simplifying it to

$$
\begin{aligned}
& = \frac{1}{2}tr\left\{\Sigma_p\Sigma_p^{-1}\right\}
\newline
& = \frac{1}{2}tr\left\{I_k\right\}
\newline
& = \frac{k}{2}
\end{aligned}
$$

We can simplify the third term using eq 380 of section 8.2 from [Matrix Cookbook](https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf)
We get,

$$\mathbb{E}_p\left[(\mathbf{x}-\boldsymbol{\mu_q})^T\Sigma_q^{-1}(\mathbf{x}-\boldsymbol{\mu_q})\right] = (\boldsymbol{\mu_p}-\boldsymbol{\mu_q})^T\Sigma_q^{-1}(\boldsymbol{\mu_p}-\boldsymbol{\mu_q}) + tr\left\{\Sigma_q^{-1}\Sigma_p\right\}$$

Combining all this we get,

---

$$ D_{KL}(p||q) = \frac{1}{2}\left[\log\frac{|\Sigma_q|}{|\Sigma_p|} - k + (\boldsymbol{\mu_p}-\boldsymbol{\mu_q})^T\Sigma_q^{-1}(\boldsymbol{\mu_p}-\boldsymbol{\mu_q}) + tr\left\{\Sigma_q^{-1}\Sigma_p\right\}\right] $$

---

<b>When $$q$$ is $$\mathcal{N}(0,\,I)$$, we get,</b>

$$ D_{KL}(p||q) = \frac{1}{2}\left[\boldsymbol{\mu_p}^T\boldsymbol{\mu_p} + tr\left\{\Sigma_p\right\} - k - \log|\Sigma_p|\right] $$
