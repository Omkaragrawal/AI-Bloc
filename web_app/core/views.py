from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .apps import CoreConfig

class TempApiView(APIView):
    "API for testing only"

    def get(self, request, format=None):
        "Returns a simple text that get method is working"
        return Response({'message': 'This API\'s GET method works !!!'})

    def post(self, request):
        flag, review = CoreConfig.model_verify.verify_model(request.data)
        print(flag, review)
        return Response(status=status.HTTP_200_OK)
        # try:
        #     model = keras.Sequential()
        #     model.add(layers.Input(shape=(20, )))
        #     for i in data.values():
        #         # model.add(keras_layers[i.strip().lower()])
        #         model.add(layers.Dense(32))
        #     # print(model.summary())
        #     return Response(status=status.HTTP_200_OK)
        # except Exception as e:
        #     print("Exception ----------------------------------------------")
        #     print(e)
        #     return Response({'error': e}, status=status.HTTP_400_BAD_REQUEST)

