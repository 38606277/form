import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import PageTitle    from 'component/page-title/index.jsx';
import Product      from 'service/product-service.jsx'
import TableList    from 'util/table-list/index.jsx';
import Table        from 'antd/lib/table';
import './../../../App.css';
const _mm   = new MUtil();
const _product      = new Product();
const showHeader = false;

class TaskInfoView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            taskId:this.props.match.params.taskId,
            taskInfo:'',
            dataList:[],
            fieldList:[],
            showHeader:true,
            userId:_mm.getStorage('userInfo').userCode
        };
    }
   
    componentDidMount(){
        this.loadtaksInfo();
    }
   
    loadtaksInfo(){
        _product.viewTaskTemplate(this.state.taskId).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                
            });
            _mm.errorTips(errMsg);
        });
    }
   

    render() {
        const format=[],titles=[];
         this.state.fieldList.map((it,index)=>{
            titles.push(it.field_name.replace(/(^\s*)|(\s*$)/g, ""));
         })
        const dataSource = this.state.dataList;

        this.state.fieldList.map((it,index)=>{
            format.push({
                title:it.field_name,
                dataIndex: it.field_name.replace(/(^\s*)|(\s*$)/g, ""),
                key:it.field_name.replace(/(^\s*)|(\s*$)/g, "")
            })
        });
        var listBody =  this.state.dataList.map((item,index)=>{
            return [<tr key={index}>
                    {
                        Object.keys(item).map(key=>{
                            this.state.fieldList.map((it,i)=>{
                                if(key==it.field_name){
                                    const val= item[key];
                                 return (  <td key={i}>
                                             {val}
                                             </td>
                                         )
                                }
                            })
                            
                        })
                    
                    }
                
                </tr>
            ]            
         })

         console.log(listBody);
        // let listBody = this.state.dataList.map((item, index) => {
        //     console.log(item);
        //     return (
        //         <tr >
        //             {
        //                 Object.keys(item).map(key=>{
        //                     this.state.fieldList.map((it,index)=>{
        //                         if(key==it.field_name){
        //                             const val= item[key];
        //                             console.log(val);
        //                             {
        //                                 <td>
        //                                 { {val} }
        //                                 </td>
        //                             }
                                    
        //                         }
        //                     })
                            
        //                 })
                       
        //             }
                   
        //         </tr>
        //     );
        // });
        
        return (
        <div id="page-wrapper">
        <PageTitle title='报表' />
                <div className="form-horizontal">
                    <div dangerouslySetInnerHTML={{__html: this.state.taskInfo}} />
                    
                    {/* <Table  {...this.state} dataSource={dataSource} columns={format} scroll={{ y: 240 }} /> */}
                    <table>
   
                        <tbody>
                            {listBody}
                        {/* {
                         this.state.dataList.map((item,index)=>{
                            return [
                                <tr >
                                    <td>{item}</td>
                                    {/* {
                                        Object.keys(item).map(key=>{
                                            this.state.fieldList.map((it,index)=>{
                                                if(key==it.field_name){
                                                    const val= item[key];
                                                  return  ( <div>
                                                      <td>
                                                            {val}
                                                            </td>
                                                            </div>
                                                            )
                                                }
                                            })
                                            
                                        })
                                    
                                    } }
                                
                                </tr>
                                 ]
                            
                        }) */}
                     
                    </tbody>
                    </table>
                </div>
                
        </div>
        
        )
  }
}
export default TaskInfoView;