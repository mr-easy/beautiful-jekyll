---
title: "Badminton Stroke Classification"
start: 2019-11-01
end: 2019-12-01
categories: project
tags: [Time-Series, ML, Badminton, Deep Learning]
---

THis was a part of the Data Analytics course at IISc. In this project our goal was to create model that can classifiy the type of badminton stroke (5 classes). The data was time series data of accelorometer and gyroscope collected by ourselves using a device attached to the player's wrist. We tried several classical machine learning models. For this we generated 281 features like average, max, skewness, etc. We also tried LSTM with different architecture for our task. The best results we found was using gradient boosting, an accuracy of 80%.