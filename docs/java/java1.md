# SpringBoot整合Quartz(一)

 >  前言:由于我们本项目选用的Springboot来整合Quartz，官方给我们提供了启动器所以很简单。在以前的版本我们想要使用Quartz需要引入的依赖如下:
 ```xml
    <dependency>  
        <groupId>org.quartz-scheduler</groupId>  
        <artifactId>quartz</artifactId>  
        <version>2.2.3</version>  
    </dependency> 
    <dependency>  
        <groupId>org.quartz-scheduler</groupId>  
        <artifactId>quartz-jobs</artifactId>  
        <version>2.2.3</version>  
    </dependency>
    ```
    > 按以上的方式来使用Quartz的话，或需要我们创建很多的配置类:`Job`的工厂类等。
    但是现在我们有了官方的启动器，依赖如下：
    ```xml
    <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-quartz</artifactId>
    </dependency>
    ```
> 此时我们不需要配置很多配置类，只需要在我们的`application.yaml`文件中配置必要的信息就ok了。

****

**<center> 1、建项目、加依赖、搞配置</center>**
**创建我们的springboot项目，并加入所需依赖**

![](http://qas55u5ql.bkt.clouddn.com/img/spring-boot-quartz.png)

## 由于需要数据库操作,加入如下依赖
```xml
<!--mysql驱动依赖-->
<dependency>
     <groupId>mysql</groupId>
     <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
     <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <optional>true</optional>
</dependency>
<dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>1.1.16</version>
</dependency>
<!--mybatis-plus 快速开发-->
<dependency>
     <groupId>com.baomidou</groupId>
     <artifactId>mybatis-plus-boot-starter</artifactId>
     <version>3.2.0</version>
</dependency>
```

## 配置基本配置
```xml
spring:
  quartz:
    auto-startup: true
    properties:
      org:
        quartz:
          scheduler:
            instanceName: clusteredScheduler
            instanceId: AUTO
          jobStore:
            class: org.quartz.impl.jdbcjobstore.JobStoreCMT
            driverDelegateClass: org.quartz.impl.jdbcjobstore.StdJDBCDelegate
            tablePrefix: QRTZ_
            isClustered: true
            clusterCheckinInterval: 10000
            useProperties: false
          threadPool:
            class: org.quartz.simpl.SimpleThreadPool
            threadCount: 20
            threadPriority: 5
            threadsInheritContextClassLoaderOfInitializingThread: true
    job-store-type: jdbc
    wait-for-jobs-to-complete-on-shutdown: true
      datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/quartz?useUnicode=true&useSSL=false&characterEncoding=utf8&serverTimezone=UTC&allowPublicKeyRetrieval=true
    username: root
    password: root
    initialSize: 20
    minIdle: 5
    timeBetweenEvictionRunsMillis: 60000
    minEvictableIdleTimeMillis: 30000
    testWhileIdle: true
    filters: stat,wall,sl4j
    connectionProperties: druid.stat.mergeSql=true;druid.stat.slowSqlMillis=5000
```

## quartz详细说明及api的使用
*涉及表说明*
```sql
    qrtz_calendars :存储quartz的calendar日历信息.
    qrtz_cron_triggers :存储cron trigger，包括cron表达式和时区信息。
    qrtz_fired_triggers :存储与已触发的trigger相关的状态信息，以及相联job的执行信息
    qrtz_job_details :存储每一个已配置的job的详细信息
    qrtz_locks :存储程序的非观锁的信息(假如使用了悲观锁)
    qrtz_paused_trigger_grps :存储已暂停的trigger组的信息
    qrtz_scheduler_state :存储少量的有关 scheduler的状态信息，和别的 scheduler 实例         qrtz_simple_triggers :存储简单的 trigger，包括重复次数，间隔，以及已触的次数
    qrtz_simprop_triggers
    qrtz_triggers :存储已配置的 trigger的信息
```
*表属性说明*

qrtz_calendars表

|字段中文名 |字段英文名| 数据类型        
| :---: | :---: | :---: | :---: |       
|计划名称      |SCHED_NAME    |VARCHAR2(120)
|触发器名称  |CALENDAR_NAME |VARCHAR2(200) | 
|日历      |CALENDA       |BLO          | 

qrtz_cron_triggers表

|字段中文名 |字段英文名| 数据类型                                                                                         
| :---: | :---: | :---: | :---: |                                                                                    
|计划名称   |  SCHED_NAME                      | VARCHAR2(120)                        |    
|定时任务类名 |  TRIGGER_NAME                   |  VARCHAR2(200)                     |       
|任务分类 | TRIGGER_GROUP                   | VARCHAR2(200)                      |      
|cron表达式 |CRON_EXPRESSION                  |VARCHAR2(120)                         |   
|时间区域 |TIME_ZONE_I                      |VARCHAR2(80 ）                       |     

qrtz_fired_triggers表

|字段中文名 |字段英文名| 数据类型                                   
| :---: | :---: | :---: | :---: |                             
|计划名称              |SCHED_NAME              |VARCHAR2(120)    
|组标识               |ENTRY_ID                |VARCHAR2(95)     
|触发器名称             |TRIGGER_NAME            |VARCHAR2(200)    
|触发器组              |TRIGGER_GROUP           |VARCHAR2(200)    
|当前实例的名称           |INSTANCE_NAME           |VARCHAR2(200)    
|当前执行时间            |FIRED_TIME              |NUMBER(13)       
|计划时间              |SCHED_TIME              |NUMBER(13)       
|权重                |PRIORITY                |NUMBER           
|状态                |STATE                   |VARCHAR2(16)     
|作业名称      |JOB_NAME|VARCHAR2(200)|
|作业组|JOB_GROUP|VARCHAR2(200)|
|是否并行|IS_NONCONCURRENT|VARCHAR2(1)|
|是否要求唤醒|REQUESTS_RECOVERY|VARCHAR2(1)|

qrtz_job_details表

 |字段中文名 |字段英文名| 数据类型                             
 | :---: | :---: | :---: | :---: |                           
 |调度名称              |SCHED_NAME              |VARCHAR2(120)  
 |job的名字            |JOB_NAME                |VARCHAR2(200)  
 |job的所属组的名         |JOB_GROUP               |VARCHAR2(200)  
 |相关介绍              |DESCRIPTION             |VARCHAR2(250)  
 |job实现类的完全         |JOB_CLASS_NAME          |VARCHAR2(250)  
 |是否持久化             |IS_DURABLE              |VARCHAR2(1)    
 |是否并发              |IS_NONCONCURRENT        |VARCHAR2(1)    
 |是否更新数据            |IS_UPDATE_DATA          |VARCHAR2(1)    
 |是否接受恢复执行          |REQUESTS_RECOVERY       |VARCHAR2(1)    
|存放持久job对象|JOB_DATA|BLOB|

 qrtz_locks表
 
 |字段中文名 |字段英文名| 数据类型                       
| :---: | :---: | :---: | :---: |                     
|计划名称       |SCHED_NAME              |VARCHAR2(120)   
|锁名          |LOCK_NAM               |VARCHAR2(40）     
 
qrtz_paused_trigger_grps表

 |字段中文名 |字段英文名| 数据类型                          
 | :---: | :---: | :---: | :---: |                     
 |计划名称              |SCHED_NAME       |VARCHAR2(120)   
 |触发器组              |TRIGGER_GROUP    |VARCHAR2(200）   

qrtz_scheduler_state表

 |字段中文名 |字段英文名| 数据类型                        
| :---: | :---: | :---: | :---: |   
|计划名称|SCHED_NAME|VARCHAR2(120)|
|实例名称|INSTANCE_NAME|VARCHAR2(200)|
|最后的检查时间|LAST_CHECKIN_TIME|NUMBER(13)|
|检查间隔|CHECKIN_INTERVAL|NUMBER(13)|

qrtz_simple_triggers表
 |字段中文名 |字段英文名| 数据类型                            
| :---: | :---: | :---: | :---: |   
|计划名称|SCHED_NAME|VARCHAR2(120)|
|触发器名称|TRIGGER_NAME|VARCHAR2(200)|
|触发器组|TRIGGER_GROUP|VARCHAR2(200)|
|重复次数|REPEAT_COUNT|NUMBER(7)|
|触发次数|REPEAT_INTERVAL|NUMBER(12)|
|重复间隔|TIMES_TRIGGERED|NUMBER(10)|

qrtz_triggers表

 |字段中文名 |字段英文名| 数据类型                       
| :---: | :---: | :---: | :---: |   
|计划名称|SCHED_NAME|VARCHAR2(120)|
|触发器名称|TRIGGER_NAME|VARCHAR2(200)|
|触发器组|TRIGGER_GROUP|VARCHAR2(200)|
|作业名称|JOB_NAME|VARCHAR2(200)|
|作业组|JOB_GROUP|VARCHAR2(200)|
|描述|DESCRIPTION|VARCHAR2(250)|
|下次执行时间|NEXT_FIRE_TIME|NUMBER(13)|
|前一次执行时间|PREV_FIRE_TIME|NUMBER(13)|
|优先权|PRIORITY|NUMBER|
|触发器状态|TRIGGER_STATE|VARCHAR2(16)|
|触发器类型|TRIGGER_TYPE|VARCHAR2(8)|
|开始时间|START_TIME|NUMBER(13)|
|结束时间|END_TIME|NUMBER(13)|
|日历名称|CALENDAR_NAME|VARCHAR2(200)|
|失败次数|MISFIRE_INSTR|NUMBER|
|作业数据|JOB_DATA|BLOB|

<html><body><center><font face="宋体" color=red  size="14" >Quartz api使用说明我们下一篇文章继续来聊！！！！！！</font></center></body></html>

<center>如有收获请关注微信公众号！！！

![微信公众号](https://cdn.jsdelivr.net/gh/triumphxx/my-images-host/img/公众号1.jpeg)


















