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

Let's our two Normal distributions be $$\mathcal{N}(\mathbf{\mu_p},\,\Sigma_p)$$ and $$\mathcal{N}(\mathbf{\mu_q}\mathbf{,\,\Sigma_q)$$, both $$k$$ dimensional.

PDF of [multivariate Normal distribution](https://en.wikipedia.org/wiki/Multivariate_normal_distribution) is given by:

$$ P(\mathbf{x}) = \frac{1}{(2\pi)^{k/2}|\Sigma|^{1/2}} \exp(-\frac{1}{2}(\mathbf{x}-\boldsymbol{\mu})^T\Sigma^{-1}(\mathbf{x}-\boldsymbol{\mu})) $$

$$ \mathbb{E}_p\left[\log(p) - \log(q)\right] $$

$$ \mathbb{E}_p\left[\frac{1}{2}\log\frac{|\Sigma_q|}{|\Sigma_p|} - \frac{1}{2}(\mathbf{x}-\boldsymbol{\mu_p})^T\Sigma_p^{-1}(\mathbf{x}-\boldsymbol{\mu_p}) + \frac{1}{2}(\mathbf{x}-\boldsymbol{\mu_q})^T\Sigma_q^{-1}(\mathbf{x}-\boldsymbol{\mu_q})\right] $$

$$ \frac{1}{2}\mathbb{E}_p\left[\log\frac{|\Sigma_q|}{|\Sigma_p|}\right] - \frac{1}{2}\mathbb{E}_p\left[(\mathbf{x}-\boldsymbol{\mu_p})^T\Sigma_p^{-1}(\mathbf{x}-\boldsymbol{\mu_p})\right] + \frac{1}{2}\mathbb{E}_p\left[(\mathbf{x}-\boldsymbol{\mu_q})^T\Sigma_q^{-1}(\mathbf{x}-\boldsymbol{\mu_q})\right] $$

$$ \frac{1}{2}\left[\log\frac{|\Sigma_q|}{|\Sigma_p|}\right] - \frac{1}{2}\mathbb{E}_p\left[(\mathbf{x}-\boldsymbol{\mu_p})^T\Sigma_p^{-1}(\mathbf{x}-\boldsymbol{\mu_p})\right] + \frac{1}{2}\mathbb{E}_p\left[(\mathbf{x}-\boldsymbol{\mu_q})^T\Sigma_q^{-1}(\mathbf{x}-\boldsymbol{\mu_q})\right] $$


Now, since $$(\mathbf{x}-\boldsymbol{\mu_p})^T\Sigma_p^{-1}(\mathbf{x}-\boldsymbol{\mu_p})$$ in the second term $$ \in \mathbb{R} $$, we can write it as $$tr\left\{(\mathbf{x}-\boldsymbol{\mu_p})^T\Sigma_p^{-1}(\mathbf{x}-\boldsymbol{\mu_p})\right\}$$, where $$tr\{\}$$ is the trace operator. And using the [trace trick](), we can write it as $$tr\left\{(\mathbf{x}-\boldsymbol{\mu_p})(\mathbf{x}-\boldsymbol{\mu_p})^T\Sigma_p^{-1}\right\}$$.

The second term now is:

$$\frac{1}{2}\mathbb{E}_p\left[tr\left\{(\mathbf{x}-\boldsymbol{\mu_p})(\mathbf{x}-\boldsymbol{\mu_p})^T\Sigma_p^{-1}\right\}\right]$$

The expectation and trace can be interchanged to get:

$$\frac{1}{2}tr\left\{\mathbb{E}_p\left[(\mathbf{x}-\boldsymbol{\mu_p})(\mathbf{x}-\boldsymbol{\mu_p})^T\Sigma_p^{-1}\right]\right\}$$

$$\frac{1}{2}tr\left\{\mathbb{E}_p\left[(\mathbf{x}-\boldsymbol{\mu_p})(\mathbf{x}-\boldsymbol{\mu_p})^T\right]\Sigma_p^{-1}\right\}$$

And we have $$\mathbb{E}_p\left[(\mathbf{x}-\boldsymbol{\mu_p})(\mathbf{x}-\boldsymbol{\mu_p})^T\right] = \Sigma_p $$.

$$\frac{1}{2}tr\left\{\Sigma_p\Sigma_p^{-1}\right\}$$
$$\frac{1}{2}tr\left\{I_k\right\}$$
$$\frac{k}{2}$$

We can simplify the third term using [eq 380 of section 8.2 from Matrix cookbook]().
We get:

$$\mathbb{E}_p\left[(\mathbf{x}-\boldsymbol{\mu_q})^T\Sigma_q^{-1}(\mathbf{x}-\boldsymbol{\mu_q})\right] = (\boldsymbol{\mu_p}-\boldsymbol{\mu_q})^T\Sigma_q^{-1}(\boldsymbol{\mu_p}-\boldsymbol{\mu_q}) + tr\left\{\Sigma_q^{-1}\Sigma_p\right\}$$

Combining all this, we get,

$$D_{KL}(p||q) = \frac{1}{2}\left[\log\frac{|\Sigma_q|}{|\Sigma_p|}\right - k + (\boldsymbol{\mu_p}-\boldsymbol{\mu_q})^T\Sigma_q^{-1}(\boldsymbol{\mu_p}-\boldsymbol{\mu_q}) + tr\left\{\Sigma_q^{-1}\Sigma_p\right\}]$$


WIP...