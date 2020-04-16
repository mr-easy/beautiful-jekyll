---
layout: post
title: "KL Divergence between 2 Gaussian Distributions"
description: KL Divergence between 2 Gaussian distribution or Normal distribution, Probability.
date: 2020-04-16
categories: post
tags: [Blog, Probability]
---

## What is the KL (Kullback–Leibler) divergence between two multivariate Gaussian distributions?

[KL divergence](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence) between two distributions $$P$$ and $$Q$$ of a continuous random variable is given by:

$$ D_{KL}(p||q) = \int_x p(x) \log \frac{p(x)}{q(x)} $$

Let's our two Normal distributions be $\mathcal{N}(\mu_p,\,\Sigma_p)$ and $\mathcal{N}(\mu_q,\,\Sigma_q)$, both $k$ dimensional.

PDF of [multivariate Normal distribution](https://en.wikipedia.org/wiki/Multivariate_normal_distribution) is given by:

$$ P(\bm{x}) = \frac{1}{(2\pi)^{k/2}|\Sigma|^{1/2}} \exp(-\frac{1}{2}(\bm{x}-\mu)^T\sigma^{-1}(\bm{x}-\mu)) $$

$$ E_p[\log(p) - \log(q)] $$
$$ E_p[\frac{1}{2}\log|frac{|\Sigma_q|}{|\Sigma_p|} - \frac{1}{2}] $$

WIP...