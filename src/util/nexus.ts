import {
  prismaExtendType,
  prismaObjectType
} from 'nexus-prisma'
import { PrismaExtendTypeBlock } from 'nexus-prisma/dist/blocks/extendType'
import {
  AddFieldInput,
  FilterInputField,
  PickInputField,
  PrismaObjectTypeNames
} from 'nexus-prisma/dist/types'
import { FieldOutConfig } from 'nexus/dist/definitions/definitionBlocks'

type ConfigFunc<
  TypeName extends PrismaObjectTypeNames,
  FieldName extends string
> =
  | FieldOutConfig<TypeName, FieldName>
  | ((
      t: PrismaExtendTypeBlock<TypeName>
    ) => FieldOutConfig<TypeName, FieldName>);

const prismaField = <TypeName extends PrismaObjectTypeNames>(
  type: TypeName
) => <FieldName extends string>(
  fieldName: FieldName,
  config: ConfigFunc<TypeName, FieldName>
) =>
  prismaExtendType<TypeName>({
    type,
    definition: t =>
      t.field<FieldName>(
        fieldName,
        typeof config === "function" ? config(t) : config
      )
  });

type FieldConfig<TypeName extends PrismaObjectTypeNames> =
  | PickInputField<"objectTypes", TypeName>
  | FilterInputField<"objectTypes", TypeName>
  | AddFieldInput<"objectTypes", TypeName>;

const prismaFields = <TypeName extends PrismaObjectTypeNames>(
  name: TypeName
) => (config: FieldConfig<TypeName>) =>
  prismaObjectType<TypeName>({
    name,
    definition: t => {
      t.prismaFields(config);
    }
  });

export const prismaQueryField = prismaField("Query");
export const prismaQueryFields = prismaFields("Query");

export const prismaMutationField = prismaField("Mutation");
export const prismaMutationFields = prismaFields("Mutation");
