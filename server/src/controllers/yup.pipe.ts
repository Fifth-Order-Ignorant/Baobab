import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { AnySchema } from 'yup';

export class YupValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const schema = (await import('baobab-common'))[
      metadata.metatype.name + 'Schema'
    ] as AnySchema;

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
