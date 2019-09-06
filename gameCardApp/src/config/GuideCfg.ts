class GuideCfg {
	
	public static readonly guidecfg:any = {
		"1_1":{"event":StartGameEvent.CLICK_GUIDE_SKILL,next:"1_2",param:{id:"1_2"}},
		"1_2":{"event":StartGameEvent.USE_GUIDE_SKILL,next:"",param:{skillId:100002}},
	}
}