import mongoose from 'mongoose';

export function connect({ url }: { url: string }) {
  mongoose.connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
}
