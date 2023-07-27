import type { Model, FilterQuery } from 'mongoose';

export const fq = {
  regex(str: string) {
    return { $regex: new RegExp(str) };
  },
  betweenDate({ start, end }: { start?: Date; end?: Date }) {
    const ret: FilterQuery<object> = {};
    start && (ret.$gte = start);
    end && (ret.$lt = end);
    return ret;
  },
  in(arr: unknown[]) {
    return { $in: arr };
  },
};
