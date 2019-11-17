class CardVo {
	/**卡片名称 */
	public name:string; 
	/**卡片等级 */
	public level:number;
	/**攻击类型:单体 - 1还是范围 - 2 - 3(直接针对国王塔)*/
	public atktype:number;
	/**攻击距离 */
	public atkDis:number;
	/**类型 1:boss,2:小怪 */
	public type:number;
	/**移动速度 */
	public spd:number;
	/**攻击值 */
	public atk:number;
	/**生命值 */
	public hp:number;
	/**卡牌id */
	public id:number;
	/**skillId 如果有 释放技能 。如果没有 。普通攻击 */
	public skillId:number;
	/**模型 */
	public model:string;
	/**攻击速度 */
	public atkspd?:number;
}