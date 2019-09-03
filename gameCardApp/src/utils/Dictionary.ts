class Dictionary {
	private _keys:any[] = [];
    private _values:any[] = [];
	
	/**
	 * 获取所有的子元素列表。
	 */
	public get values():any[] {
		return this._values;
	}
	
	/**
	 * 获取所有的子元素键名列表。
	 */
	public get keys():any[] {
		return this._keys;
	}
	
	/**
	 * 给指定的键名设置值。
	 * @param   key 键名。
	 * @param   value 值。
	 */
	public setKeyValue(key:any, value:any):void {
		var index:number = this._keys.indexOf(key);
		if (index >= 0) {
			this._values[index] = value;
			return;
		}
		this._keys.push(key);
		this._values.push(value);
	}
	
	/**
	 * 返回指定键名的值。
	 * @param   key 键名对象。
	 * @return 指定键名的值。
	 */
	public getValue(key:any):any {
		var index:number = this._keys.indexOf(key);
		return index < 0 ? null : this._values[index];
	}
	
	/**
	 * 移除指定键名的值。
	 * @param   key 键名对象。
	 * @return 是否成功移除。
	 */
	public remove(key:any):Boolean {
		var index:number = this._keys.indexOf(key);
		if (index >= 0) {
			this._keys.splice(index, 1);
			this._values.splice(index, 1);
			return true;
		}
		return false;
	}
	
	/**
	 * 清除此对象的键名列表和键值列表。
	 */
	public clear():void {
		this._values.length = 0;
		this._keys.length = 0;
	}
}