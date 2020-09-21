/**
 *  ts默认参数
 * @param dp defaultProps object,
 * @param component react组件
 *
 * eg
 * type Iprops = {
 *   count: number;
 * } & Readonly<typeof defaultProps>;
 * export const CellColors = {
 *  primary: '#46E889',
 *   warning: '#F5A623',
 *   danger: 'fb1f3a',
 * };
 *
 * const _Progress: FC<Iprops> = ({ cellColor, count }) => {
 *  return <Div></Div>
 * }
 *
 * export const Progress = withDefaultProps(defaultProps, _Progress);
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function withDefaultProps<DP, P>(
  dp: DP,
  component: React.ComponentType<P>,
){
  component.defaultProps = dp;
  type RequiredProps = Omit<P, keyof DP>;
  return (component as React.ComponentType<unknown>) as React.ComponentType<
    RequiredProps & Partial<DP>
  >;
}
