import React, { Component } from 'react';
import '../App.less'
import { Table } from 'antd'

const data = {
    Onumber:18,
    UseNumber:34,
    MostSupplies:'USS微创手术系列',
    pei:'12%',
    OpearaName:'胫骨平台手术，髋关节置换手术',
    MostPie:'70%'
}

const dataTree = [
    {name:'李*',OperaName:'胫骨平台手术',Supplies:'自钻型规格螺纹',local:'浙一医院'},
    {name:'王*',OperaName:'胫骨平台手术',Supplies:'自钻型规格螺纹',local:'浙一医院'},
    {name:'张*',OperaName:'髋关节置换手术',Supplies:'2com自贡螺钉 5com外固定螺钉 镶嵌石外固定连接器',local:'浙江邵逸夫医院'},
    {name:'李*',OperaName:'劲椎盘切除术',Supplies:'自钻型规格螺纹',local:'武汉人民医院'},
    {name:'李*',OperaName:'颈椎融合术',Supplies:'3mm小螺纹 锥形重剑钢板',local:'浙二医院'},
    {name:'李*',OperaName:'髋关节置换手术',Supplies:'3mm小螺纹 锥形重剑钢板',local:'舟山医院'},
    {name:'李*',OperaName:'髋关节置换手术',Supplies:'5mm小螺纹 锥形重剑钢板',local:'杭州市第一人民医院'},
    {name:'李*',OperaName:'髋关节置换手术',Supplies:'自钻型规格螺纹',local:'浙二医院'},
    {name:'李*',OperaName:'颈椎融合术',Supplies:'自钻型规格螺纹',local:'杭州武警医院'},
    {name:'李*',OperaName:'颈椎融合术',Supplies:'3mm小螺纹 锥形重剑钢板',local:'浙一医院'},
    {name:'李*',OperaName:'颈椎融合术',Supplies:'3mm小螺纹 锥形重剑钢板',local:'浙一医院'},
    {name:'李*',OperaName:'劲椎盘切除术',Supplies:'3mm小螺纹 锥形重剑钢板',local:'武汉人民医院'},
    {name:'李*',OperaName:'劲椎盘切除术',Supplies:'3mm小螺纹 锥形重剑钢板',local:'舟山医院'},
];
const columns = [{
    title: '患者',
    dataIndex: 'name',
    key: 'name',
    className:'test'
}, {
    title: '手术分类',
    dataIndex: 'OperaName',
    key: 'OperaName',
    className:'test'
}, {
    title: '耗材信息',
    dataIndex: 'Supplies',
    key: 'Supplies',
    className:'test'
}, {
    title: '所在医院',
    dataIndex: 'local',
    key: 'local',
    className:'test'
}];
class Supplies extends Component {
    render() {
        return (
            <div className='OperationNum'>
                <h1>手术耗材信息</h1>
                <span className="englishPart">Surgical supplies information</span>
                <div className="OperationWord">
                    本周<span>{data.number}</span>台手术中共计使用了<span>{data.UseNumber}</span>个单位耗材，其中<span>{data.MostSupplies}</span>使用占比最多，占比值约为
                    <span>{data.pie}</span>
                </div>
                <div className="OperationWordOther">
                    从手术分类来看，<span>{data.OpearaName}</span>占到了所有手术<span>{data.MostPie}</span>份额，比重较高。
                </div>
                <div className="rpt-table-warp center">
                    <Table bordered
                           columns={columns}
                           dataSource={dataTree}
                           rowKey={row => row.id}
                           pagination={false}
                           size='small'
                    />
                </div>
            </div>
        );
    }
}

export default Supplies;