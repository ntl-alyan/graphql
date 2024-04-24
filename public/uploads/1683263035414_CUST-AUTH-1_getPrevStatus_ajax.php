<?php include_once "$_SERVER[DOCUMENT_ROOT]/views/crmViews/nayatelCrm/include_files/centralizedDatabaseConnection.php"; ?>
<?php 
include_once "../../../../tempelate/include_files/track_session.php";
ini_set("display_errors",1);
$userid=$_POST['userid'];
$date='02-FEB-2019 00:00:00';

	$conn = centralizedOraPrDBConn ( "crmorauser", "", "" );
    $array1= array(); $array2= array();$logsArray= array();
    $mainArray=array();
    $resultNum=0;

                $query="select dbuser,custid, oldvalue, newvalue,to_char(datetime,'DD-MON-YYYY HH24:MI:SS')as datetime,reason,comments, rownum 
                from(select NEW_COMMENT as comments,NEW_substatus as reason,operator as dbuser,userid as custid,(case when old_status = 'active' then old_status when old_status = 'lock' and 
                old_substatus in ('non-payment','temporary closure') then old_status||' ( '||old_substatus||' )' when old_status = 'lock' and 
                old_substatus in ('under installation','termination') then old_status||' ( '||old_substatus||' '||old_reason||' )' else old_status end) oldvalue,
                (case when new_status = 'active' then new_status when new_status = 'lock' and 
                new_substatus in ('non-payment','temporary closure') then new_status||' ( '||new_substatus||' )' when new_status = 'lock' and 
                new_substatus in ('under installation','termination') then new_status||' ( '||new_substatus||' '||new_reason||' )' else new_status end)newvalue,datetime
                from CNBS.USERS_STATUS_LOG where userid='$userid' and datetime >= to_date('$date','DD-MON-YYYY HH24:MI:SS') order by datetime desc)where ROWNUM<=5";
                $logstmt = oci_parse ( $conn, $query );	
                if (! oci_execute ( $logstmt )) {
                $r = oci_error ( $logstmt );
                print_r ( $r );
                exit ();
                }

            while($r = oci_fetch_assoc( $logstmt )){
                $logsArray[]=$r;
            }
            
                
                 $resultNum = oci_num_rows($logstmt);
                 
                 if ($resultNum == 5)
                 {
                    $mainArray = $logsArray;
                 }
                
                 elseif ($resultNum >0 && $resultNum<5)
                 {  
                     $num=5-$resultNum;
                     $mainArray = $logsArray;
                     $logTime=$logsArray[$resultNum-1]['DATETIME'];
              
                    //  $logdate= substr($logTime,0,17);
                      

                     $query="select dbuser, custid, oldvalue, newvalue,to_char(datetime,'DD-MON-YYYY HH24:MI:SS')as datetime, rownum
                     from (select dbuser, custid, oldvalue, newvalue, datetime, rownum from NAYATELUSER.APPS_LOGGING where custid = '$userid' and moduleid 
                     in ( 'CUSTOMER LOCKING','StatusModule','Bonus','WHMCS PAYMENT') and key in ('statuschanged','status')
                     and datetime < to_date('$logTime','DD-MON-YYYY HH24:MI:SS') order by datetime desc) where rownum<=$num";
                     $stmt = oci_parse ( $conn, $query );	
                     if (! oci_execute ( $stmt )) {
                     $r = oci_error ( $stmt );
                     print_r ( $r );
                     exit ();
                     }
                 
                  while($r = oci_fetch_assoc( $stmt )){
                     $AppsArray1[]=$r;
                 }	
     
     
                     $query1="select b.operator, b.userid, b.reason, b.comments, b.rn from (select userid, datetime, reason, comments, operator, row_number() over (partition by userid order by datetime desc) rn from(select a.userid, a.datetime, max(decode(a.key, 'reason', a.value)) "."REASON"."  , max(decode(a.key, 'comments', a.value)) "."COMMENTS".", a.operator from (select userid, datetime, key, value, operator, row_number() over (partition by userid order by datetime desc) rn from USERLOCKCOMMENTS where userid = '$userid' order by datetime desc) a group by a.datetime, a.userid, a.operator order by a.datetime desc)) B where B.rn <= 2" ;
                     $stmt1 = oci_parse ( $conn, $query1 );	
                     if (! oci_execute ( $stmt1 )) {
                     $r1 = oci_error ( $stmt1);
                     print_r ( $r1 );
                     exit ();
                     }
     
                     $reasonNum = oci_num_rows($stmt);
                     if ($reasonNum !== 0){
                          while($r1 = oci_fetch_assoc( $stmt1 )){
                     $AppsArray2[]=$r1;
                 }
                  $mainArray2=array_replace_recursive($AppsArray1,$array2);
                  $mainArray=array_merge($mainArray,$mainArray2);
                 // print_r(array_replace_recursive($array1, $array2, $array3, $array4));
                //   print_r($mainArray2); exit;
                     }
                 

                 }


                elseif ($resultNum == 0)
                 {

                $query="select dbuser, custid, oldvalue, newvalue,to_char(datetime,'DD-MON-YYYY HH24:MI:SS')as datetime, rownum
                from (select dbuser, custid, oldvalue, newvalue, datetime, rownum from NAYATELUSER.APPS_LOGGING where custid = '$userid' and moduleid 
                in ( 'CUSTOMER LOCKING','StatusModule','Bonus','WHMCS PAYMENT') and key in ('statuschanged','status')
                and datetime < to_date('$date','DD-MON-YYYY HH24:MI:SS') order by datetime desc) where rownum<=5";
				$stmt = oci_parse ( $conn, $query );	
				if (! oci_execute ( $stmt )) {
				$r = oci_error ( $stmt );
				print_r ( $r );
				exit ();
				}
			
			 while($r = oci_fetch_assoc( $stmt )){
				$array1[]=$r;
			}	


				$query1="select b.operator, b.userid, b.reason, b.comments, b.rn from (select userid, datetime, reason, comments, operator, row_number() over (partition by userid order by datetime desc) rn from(select a.userid, a.datetime, max(decode(a.key, 'reason', a.value)) "."REASON"."  , max(decode(a.key, 'comments', a.value)) "."COMMENTS".", a.operator from (select userid, datetime, key, value, operator, row_number() over (partition by userid order by datetime desc) rn from USERLOCKCOMMENTS where userid = '$userid' order by datetime desc) a group by a.datetime, a.userid, a.operator order by a.datetime desc)) B where B.rn <= 2" ;
				$stmt1 = oci_parse ( $conn, $query1 );	
				if (! oci_execute ( $stmt1 )) {
				$r1 = oci_error ( $stmt1);
				print_r ( $r1 );
				exit ();
				}

			
			 while($r1 = oci_fetch_assoc( $stmt1 )){
				$array2[]=$r1;
            }
             $mainArray=array_replace_recursive($array1,$array2);
            // print_r(array_replace_recursive($array1, $array2, $array3, $array4));
            //  print_r($mainArray);
            
                 }

                 
				


	?>

<div class="table-scrollable">
    <table class="table table-hover table-striped table-bordered">
        <thead>
            <tr>
                <th> New Status </th>
                <th> Old Status </th>
                <th> Date </th>
                <th> Operator </th>
                <th> Reason </th>
                <th> Comments </th>
            </tr>
        </thead>
        <tbody id="openTicketsTable">

            <?php
                $count=count($mainArray);
                for($i=0;$i<$count;$i++)
                {
                    ?> 
                        <tr> 
                            <td> 
                                <?php echo $mainArray[$i]['NEWVALUE'];?>   
                            </td>
                            <td> 
                                <?php echo $mainArray[$i]['OLDVALUE'];?>
                            </td>
                            <td>
                                <?php echo $mainArray[$i]['DATETIME'];?>
                            </td>
                            <td>
                                <?php
//                                if($array1[$i]['NEWVALUE']=="softlock")
//                                {
//                                    echo "Bulk Locker";
//                                }
//                                else
//                                {
                                echo $mainArray[$i]['DBUSER'];
//                                }
                                ?>
                            </td>
                            <td> 
                                <?php if($mainArray[$i]['NEWVALUE']!='active'){echo $mainArray[$i]['REASON'];}
                                ?> 
                               <!--  added by waqas -->
                                <!-- <?php echo $mainArray[$i]['REASON'];
                                ?>  -->
                            </td>
                            <td> 
                                <!-- added by waqas -->
                                <?php if($mainArray[$i]['OLDVALUE'] == 'lock ( non-payment )' || $mainArray[$i]['OLDVALUE'] == 'lock ( temporary closure )') echo $mainArray[$i]['COMMENTS'];
                                ?>
                                <!-- <?php if($mainArray[$i]['NEWVALUE']!='active'){echo $mainArray[$i]['COMMENTS'];}
                                ?> -->
                            </td>
                        </tr>
                    <?php 
                }
            ?>
        </tbody>
    </table>
</div>