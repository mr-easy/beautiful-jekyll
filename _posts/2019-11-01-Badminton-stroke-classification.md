---
title: "Badminton Stroke Classification"
start: 2019-11-01
end: 2019-12-01
categories: project
tags: [Time-Series, ML, Badminton, Deep Learning]
code: https://github.com/mr-easy/Badminton-Stroke-Classification
---

This was a part of the Data Analytics course at IISc. In this project our goal was to create model that can classifiy the type of badminton stroke (5 classes). The data was time series sensor data of accelerometer and gyroscope sensors collected by ourselves using a device attached to the player's wrist. We tried several classical machine learning models. For this we generated 281 features like average, max, skewness, etc. We also tried LSTM with different architectures. The best results we found was using gradient boosting with 80% accuracy.