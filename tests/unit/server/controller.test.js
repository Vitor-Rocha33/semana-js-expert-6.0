import { jest, expect, describe, test, beforeEach } from "@jest/globals"
import { Controller } from "../../../server/controller"
import { Service } from "../../../server/service.js"
import TestUtil from "../_util/testUtil.js"

describe("#Controller", () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test("getFileStream()", async () => {
    const fileName = "/index.html"
    const expectedType = ".html"

    const mockFileStream = TestUtil.generateReadableStream(["test"])
    
    const getFileStreamMock = jest
      .spyOn(Service.prototype, Service.prototype.getFileStream.name)
      .mockReturnValue({
        stream: mockFileStream,
        type: expectedType
      })

    const controller = new Controller()
    await controller.getFileStream(fileName)

    expect(getFileStreamMock).toHaveBeenCalledWith(fileName)
  })
})
