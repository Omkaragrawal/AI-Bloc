# from tensorflow import keras
# from tensorflow.keras import layers

# class ModelVerification:

#     def __init__(self):
#         self.layers = {
#             'dense': layers.Dense(32),
#             'lstm': layers.LSTM(40)
#         }

#     def verify_model(self, data):
#         try:
#             model = keras.Sequential()
#             model.add(layers.Input(shape=(20, )))
#             for i in data.values():
#                 # model.add(self.layers[i.strip().lower()])
#                 model.add(layers.Dense(32))
#             print(model.summary())
#             return 1, model.summary()
        
#         except Exception as e:
#             return 0, e
