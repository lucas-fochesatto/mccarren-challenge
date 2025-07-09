from adapters import n8n

async def exctract_website_info(url):
    data = {"url": url}
    response = await n8n.trigger_workflow('webhook/company-profile', data)

    return response