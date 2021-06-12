import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { AnySchema } from 'yup';
import * as schemas from 'baobab-common';

export class YupValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // eslint-disable-next-line import/namespace
    const schema = schemas[metadata.metatype.name + 'Schema'] as AnySchema;

    if (schema) {
      try {
        schema.validateSync(value, { abortEarly: false });
      } catch (reason) {
        throw new BadRequestException({
          errors: reason.inner,
        });
      }
    }

    return value;
  }
}
