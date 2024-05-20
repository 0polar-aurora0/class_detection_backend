const fs = require('fs');

export const fileCopy = async (input: string, output: string) => {
  // 定义源文件和目标文件的路径

  // 创建可读流
  const readStream = fs.createReadStream(input);

  // 创建可写流
  const writeStream = fs.createWriteStream(output);

  // 执行拷贝操作
  await readStream.pipe(writeStream);

  // 监听拷贝完成事件
  writeStream.on('finish', () => {
    console.log('文件拷贝完成');
  });

  // 监听可能出现的错误
  writeStream.on('error', err => {
    console.error('拷贝过程中出现错误:', err);
  });
};
