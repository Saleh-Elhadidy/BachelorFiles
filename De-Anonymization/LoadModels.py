from keras.utils import plot_model
from keras.models import load_model
model = load_model(r"C:\Personal\Bachelor\De-Anonymization\CalssifierBase22.h5")
plot_model(model, to_file='model22.png',show_shapes=True)