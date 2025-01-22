export type SubstanceData = {
  id: string;
  tags: (
    | [id: string, value: string | number | boolean | number[]]
    | [id: "dve_parent_substance", value: string]
    | [id: "dve_is_transparent", value: string]
    | [id: "dve_rendered_substance", value: string]
    | [id: "dve_culled_substances", value: string[]]
    | [id: "dve_is_solid", value: boolean]
    | [id: "dve_is_liquid", value: boolean]
    | [id: "dve_flow_rate", value: number]
  )[];
};
