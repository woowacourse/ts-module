interface CustomResponse {
  status: 200 | 400
  json: () => Promise<Object>
}

interface CustomFetchOptions {
  headers: HeadersInit
  method: string
  body: string
}

function fetch(
  url: URL | string,
  options: Partial<CustomFetchOptions> = {},
): Promise<CustomResponse> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    const { method = 'GET', headers = {}, body = '' } = options

    request.open(method, url)
    request.onreadystatechange = () => {
      if (request.readyState !== XMLHttpRequest.DONE) return

      resolve({
        status: 200,
        json: () =>
          new Promise((resolve) => {
            resolve({ result: '성공' })
          }),
      })
    }

    Object.entries(headers).forEach(([key, value]) => request.setRequestHeader(key, value))
    request.send(body?.toString())
  })
}

export default fetch
