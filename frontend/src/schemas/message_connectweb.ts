// @generated by protoc-gen-connect-web v0.2.1 with parameter "target=ts"
// @generated from file schemas/message.proto (package schemas, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {MessageRequest, MessageResponse} from "./message_pb.js";
import {MethodKind} from "@bufbuild/protobuf";

/**
 * @generated from service schemas.MessageService
 */
export const MessageService = {
  typeName: "schemas.MessageService",
  methods: {
    /**
     * @generated from rpc schemas.MessageService.send
     */
    send: {
      name: "send",
      I: MessageRequest,
      O: MessageResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc schemas.MessageService.read
     */
    read: {
      name: "read",
      I: MessageRequest,
      O: MessageResponse,
      kind: MethodKind.ServerStreaming,
    },
  }
} as const;

