from aiohttp import web
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP

routes = web.RouteTableDef()

@routes.get('/login')
async def handle(request):
    return web.Response(text="Anton Fomin")

@routes.post('/')
async def handle_post(request):
    data = await request.post()
    secret_file = data['secret'].file
    key_file = data['key'].file
    priv_key = RSA.import_key(key_file.read())
    priv_key = PKCS1_OAEP.new(priv_key)
    decrypted_text = priv_key.decrypt(secret_file.read())
    decrypted_str = decrypted_text.decode("UTF-8").strip()
    return web.Response(text=decrypted_str)

async def application():
    app = web.Application()
    app.add_routes(routes)
    return app

if __name__ == '__main__':
    app = web.Application()
    app.add_routes(routes)
    web.run_app(app)