// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file schemas/v1/chat.proto (package schemas.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from message schemas.v1.ChatStart
 */
export class ChatStart extends Message<ChatStart> {
  /**
   * @generated from field: string groupName = 1;
   */
  groupName = "";

  /**
   * @generated from field: string userName = 2;
   */
  userName = "";

  constructor(data?: PartialMessage<ChatStart>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "schemas.v1.ChatStart";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "groupName", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "userName", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatStart {
    return new ChatStart().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatStart {
    return new ChatStart().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatStart {
    return new ChatStart().fromJsonString(jsonString, options);
  }

  static equals(a: ChatStart | PlainMessage<ChatStart> | undefined, b: ChatStart | PlainMessage<ChatStart> | undefined): boolean {
    return proto3.util.equals(ChatStart, a, b);
  }
}

/**
 * @generated from message schemas.v1.ChatRequest
 */
export class ChatRequest extends Message<ChatRequest> {
  /**
   * @generated from field: string groupName = 1;
   */
  groupName = "";

  /**
   * @generated from field: string userName = 2;
   */
  userName = "";

  /**
   * @generated from field: string text = 3;
   */
  text = "";

  constructor(data?: PartialMessage<ChatRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "schemas.v1.ChatRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "groupName", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "userName", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatRequest {
    return new ChatRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatRequest {
    return new ChatRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatRequest {
    return new ChatRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ChatRequest | PlainMessage<ChatRequest> | undefined, b: ChatRequest | PlainMessage<ChatRequest> | undefined): boolean {
    return proto3.util.equals(ChatRequest, a, b);
  }
}

/**
 * @generated from message schemas.v1.ChatSended
 */
export class ChatSended extends Message<ChatSended> {
  /**
   * @generated from field: bool ok = 1;
   */
  ok = false;

  constructor(data?: PartialMessage<ChatSended>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "schemas.v1.ChatSended";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ok", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatSended {
    return new ChatSended().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatSended {
    return new ChatSended().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatSended {
    return new ChatSended().fromJsonString(jsonString, options);
  }

  static equals(a: ChatSended | PlainMessage<ChatSended> | undefined, b: ChatSended | PlainMessage<ChatSended> | undefined): boolean {
    return proto3.util.equals(ChatSended, a, b);
  }
}

/**
 * @generated from message schemas.v1.ChatResponse
 */
export class ChatResponse extends Message<ChatResponse> {
  /**
   * @generated from field: string chatId = 1;
   */
  chatId = "";

  /**
   * @generated from field: string userName = 2;
   */
  userName = "";

  /**
   * @generated from field: string text = 3;
   */
  text = "";

  constructor(data?: PartialMessage<ChatResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "schemas.v1.ChatResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "chatId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "userName", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatResponse {
    return new ChatResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatResponse {
    return new ChatResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatResponse {
    return new ChatResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ChatResponse | PlainMessage<ChatResponse> | undefined, b: ChatResponse | PlainMessage<ChatResponse> | undefined): boolean {
    return proto3.util.equals(ChatResponse, a, b);
  }
}

/**
 * @generated from message schemas.v1.ChartHistory
 */
export class ChartHistory extends Message<ChartHistory> {
  /**
   * @generated from field: repeated schemas.v1.ChatResponse data = 1;
   */
  data: ChatResponse[] = [];

  constructor(data?: PartialMessage<ChartHistory>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "schemas.v1.ChartHistory";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "data", kind: "message", T: ChatResponse, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChartHistory {
    return new ChartHistory().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChartHistory {
    return new ChartHistory().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChartHistory {
    return new ChartHistory().fromJsonString(jsonString, options);
  }

  static equals(a: ChartHistory | PlainMessage<ChartHistory> | undefined, b: ChartHistory | PlainMessage<ChartHistory> | undefined): boolean {
    return proto3.util.equals(ChartHistory, a, b);
  }
}

