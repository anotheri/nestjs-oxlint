import type { StaticDecode, StaticEncode, TSchema } from '@sinclair/typebox';
import { FormatRegistry, Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import jsf from 'json-schema-faker';

import cloneDeep from 'lodash/cloneDeep';

import {
  emailFormat,
  uuidFormat,
  urlFormat,
  dateFormat,
  timeFormat,
  dateTimeFormat,
} from 'nestjs-typebox';

function urlLocalFormat(value: string): boolean {
  const urlLocalRegexp =
    /^(?:mysql|postgresql|https?|wss?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.?(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu;

  return urlLocalRegexp.test(value);
}

// register string formats to match nestjs-typebox
FormatRegistry.Set('email', emailFormat);
FormatRegistry.Set('uuid', uuidFormat);
FormatRegistry.Set('url', urlFormat);
FormatRegistry.Set('url-local', urlLocalFormat);
FormatRegistry.Set('date', dateFormat);
FormatRegistry.Set('time', timeFormat);
FormatRegistry.Set('date-time', dateTimeFormat);

export { Type } from '@sinclair/typebox';
export type {
  Static,
  StaticDecode,
  StaticEncode,
  TSchema,
  StringOptions,
} from '@sinclair/typebox';

// deprecated
export const fakeDto = <T>(schema: TSchema): T => jsf.generate(schema) as T;

export function parseEncoded<T extends TSchema>(
  schema: T,
  data: unknown,
): StaticEncode<T> {
  // const clonedData = Value.Clone(data); // doesn't work with computed fields
  const clonedData = cloneDeep(data);
  const defaultData = Value.Default(schema, clonedData);
  const cleanedData = Value.Clean(schema, defaultData);
  const encodedData = Value.Encode(schema, cleanedData);
  return encodedData;
}

export function parseDecoded<T extends TSchema>(
  schema: T,
  data: unknown,
): StaticDecode<T> {
  const encodedData = parseEncoded(schema, data);
  const decodedData = Value.Decode(schema, encodedData);
  return decodedData;
}

export const transformDate = (options?: Parameters<typeof Type.String>[0]) =>
  Type.Transform(Type.String({ format: 'date-time', ...options }))
    .Decode((value) => new Date(value))
    .Encode((value) => value.toISOString());
