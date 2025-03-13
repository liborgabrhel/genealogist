import { type FileUpload, parseFormData } from "@mjackson/form-data-parser"

type Options = {
  maxPartSize?: number
}

function createMemoryUploadHandler(options: Options) {
  const { maxPartSize = Infinity } = options

  return async (fileUpload: FileUpload) => {
    const reader = fileUpload.stream().getReader()
    const chunks: Uint8Array[] = []
    let size = 0

    while (size <= maxPartSize) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }
      chunks.push(value)
      size += value.length
    }

    return new File(chunks, fileUpload.name, { type: fileUpload.type })
  }
}

export const getMultipartFormData = async (
  request: Request,
  options?: Options
) => {
  const uploadHandler = createMemoryUploadHandler({
    maxPartSize: options?.maxPartSize,
  })

  return parseFormData(request, uploadHandler)
}
