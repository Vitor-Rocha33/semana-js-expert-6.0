import { jest, expect, describe, test, beforeEach } from "@jest/globals"
import { Service } from "../../../server/service.js"
import TestUtil from "../_util/testUtil.js"

import config from "../../../server/config.js"
import { join } from "path"
import fsPromises from "fs/promises"
import fs from "fs"

const {
  dir: { publicDirectory },
} = config

describe("#Service - test services", () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test("getFileStream()", async () => {
    const mockFileStream = TestUtil.generateReadableStream(["test"])

    const expectedType = ".html"
    const fileName = "/index.html"

    jest
      .spyOn(Service.prototype, Service.prototype.getFileInfo.name)
      .mockResolvedValue({
        type: expectedType,
        name: fileName,
      })

    const createFileStreamMock = jest
      .spyOn(Service.prototype, Service.prototype.createFileStream.name)
      .mockReturnValue(mockFileStream)

    const service = new Service()

    await service.getFileStream(fileName)

    expect(createFileStreamMock).toHaveBeenCalledWith(fileName)
  })

  test("getFileInfo()", async () => {
    const fileName = "/index.html"
    const fullFilePath = join(publicDirectory, fileName)

    const fsPromisesMock = jest
      .spyOn(fsPromises, fsPromises.access.name)
      .mockReturnValue()

    const service = new Service()

    await service.getFileInfo(fileName)

    expect(fsPromisesMock).toHaveBeenCalledWith(fullFilePath)
  })

  test("createFileStream()", async () => {
    const fileName = "/index.html"
    const mockFileStream = TestUtil.generateReadableStream(["test"])
    const createReadStreamMock = jest
      .spyOn(fs, fs.createReadStream.name)
      .mockReturnValue(mockFileStream)

    const service = new Service()

    await service.createFileStream(fileName)

    expect(createReadStreamMock).toHaveBeenCalledWith(fileName)  
  })
})
