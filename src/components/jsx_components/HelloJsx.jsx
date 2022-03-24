import { ElButton } from 'element-plus';

const HelloTest = (props) => {
  const print = () => {
    console.log('输出结果');
  };
  return (
    <>
      <div>jsx组件 {props.msg}</div>
      <ElButton onClick={print}>ele点击</ElButton>
    </>
  );
};
export default HelloTest;
