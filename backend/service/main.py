from flask import Flask, request
from urllib import quote_plus
from requests import get

app = Flask(__name__)


class RomaniRequest(object):
    ENDPOINT = 'https://ramani.ujuizi.com/ddl/wms'

    def __init__(self, **kwargs):
        package = 'com.lidialiker.ramaniapi'
        with open('token') as f:
            token = f.read().strip()
        self._params = {
            'token': token,
            'package': package
        }

        self._params.update(**kwargs)

    def get(self, ep=None, quoted=True):
        params_encoded = {k: quote_plus(v) for (k, v)
                          in self._params.iteritems()} if quoted \
                          else self._params
        # just because bbox is special
        if self._params.get('bbox'):
            params_encoded['bbox'] = self._params['bbox']
        endpoint = ep or self.ENDPOINT
        print "{}?{}".format(endpoint, "&".join([
            "{}={}".format(k, v) for (k, v) in params_encoded.iteritems()]))
        return get(endpoint, params=params_encoded).text


@app.route("/menu")
def menu():
    return RomaniRequest(
        request='GetMetadata',
        item='menu'
    ).get()


@app.route('/layer/<string:seriesName>/<string:feature>')
def get_layer_details(seriesName, feature):
    return RomaniRequest(
        request='GetMetadata',
        item='layerDetails',
        layerName="{}/{}".format(seriesName, feature)
    ).get(quoted=False)


@app.route('/capabilities/<string:seriesName>')
def capabilities(seriesName):
    return RomaniRequest(
        request='GetCapabilities',
        service='WMS',
        version='1.3.0',
        dataset=seriesName
    ).get()


@app.route('/feature_info/<string:seriesName>/<string:feature>', methods=['POST'])
def feature_info(seriesName, feature):
    bbox = ",".join(request.get_json())
    return RomaniRequest(
        request='GetFeatureInfo',
        service='WMS',
        version='1.1.1',
        srs='EPSG:4326',
        query_layers=seriesName + '/' + feature,
        bbox=bbox,
        info_format='text/json',
        width='256',
        height='256',
        x='0',
        y='0'
    ).get()


@app.route('/map/<string:layer_id>', methods=['POST'])
def get_area(layer_id):
    bbox = ",".join(request.get_json())

    return RomaniRequest(
        request='GetMap',
        service='wms',
        version='1.3.0',
        styles='boxfill/glayscale',
        crs='EPSG:4326',  # does not mean much for tilechache
        bbox=bbox,
        layers=layer_id,
        width='256',  # that's the max they provide us
        height='256',
        format='image/png'  # always get you pngs, even if it's something different here
    ).get(
        ep="https://ramani.ujuizi.com/cloud/wms/ramaniddl/tilecache"
    )

