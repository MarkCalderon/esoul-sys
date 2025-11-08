
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IFile extends Document {
  fileName: string;
  originalName: string;
  size: number;
  mimeType: string;
  filePath: string;
}

const fileSchema = new Schema<IFile>({
  fileName: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
});

const File: Model<IFile> = mongoose.model<IFile>('file', fileSchema);
export default File;
