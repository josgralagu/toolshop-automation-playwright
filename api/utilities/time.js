export async function timed(fn) {
  const t0 = Date.now();
  const res = await fn();
  res.duration = Date.now() - t0;
  return res;
}