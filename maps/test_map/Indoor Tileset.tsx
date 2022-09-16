<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.8" tiledversion="1.8.6" name="Indoor Tileset" tilewidth="16" tileheight="16" tilecount="1702" columns="37">
 <image source="IndoorTileset.png" width="592" height="736"/>
 <tile id="0">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="1">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="2">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Spawn" x="0" y="0" width="16" height="16">
    <properties>
     <property name="id" value="0"/>
    </properties>
   </object>
  </objectgroup>
 </tile>
 <tile id="3">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Exit" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="4">
  <objectgroup draworder="index" id="2">
   <object id="1" name="OfficeToOutside" type="Spawn" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="5">
  <objectgroup draworder="index" id="2">
   <object id="1" name="OutsideToOffice" type="Exit" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="33">
  <objectgroup draworder="index" id="2">
   <object id="1" name="Spawn Hallway 1" type="Spawn" x="0" y="0" width="16" height="16">
    <properties>
     <property name="id" type="int" value="1"/>
    </properties>
   </object>
  </objectgroup>
 </tile>
 <tile id="34">
  <objectgroup draworder="index" id="2">
   <object id="1" name="Entrance Exit" type="Exit" x="0" y="0" width="16" height="16">
    <properties>
     <property name="spawn" type="int" value="1"/>
     <property name="targetmap" value="MF_Entrance.tmx"/>
    </properties>
   </object>
  </objectgroup>
 </tile>
 <tile id="35">
  <objectgroup draworder="index" id="2">
   <object id="1" name="Spawn Entrance 1" type="Spawn" x="0" y="0" width="16" height="16">
    <properties>
     <property name="id" type="int" value="1"/>
    </properties>
   </object>
  </objectgroup>
 </tile>
 <tile id="36">
  <objectgroup draworder="index" id="2">
   <object id="1" name="Hallway Exit" type="Exit" x="0" y="0" width="16" height="16">
    <properties>
     <property name="spawn" type="int" value="1"/>
     <property name="targetmap" value="MF_Hallway.tmx"/>
    </properties>
   </object>
  </objectgroup>
 </tile>
 <tile id="41">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="7" width="16" height="9"/>
   <object id="2" type="Occluder" x="0" y="7" width="16" height="9"/>
   <object id="4" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="42">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="7" width="16" height="9"/>
   <object id="2" type="Occluder" x="0" y="7" width="16" height="9"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="43">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="7" width="16" height="9"/>
   <object id="2" type="Occluder" x="0" y="7" width="16" height="9"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="44">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="47">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="48">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="7" width="16" height="9"/>
   <object id="2" type="Occluder" x="0" y="7" width="16" height="9"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="49">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="7" width="16" height="9"/>
   <object id="2" type="Occluder" x="0" y="7" width="16" height="9"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="50">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="7" width="16" height="9"/>
   <object id="2" type="Occluder" x="0" y="7" width="16" height="9"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="72">
  <objectgroup draworder="index" id="2">
   <object id="1" name="Spawn Entrance 2" type="Spawn" x="0" y="0" width="16" height="16">
    <properties>
     <property name="id" type="int" value="2"/>
    </properties>
   </object>
  </objectgroup>
 </tile>
 <tile id="73">
  <objectgroup draworder="index" id="2">
   <object id="1" name="LivingRoom Exit" type="Exit" x="0" y="0" width="16" height="16">
    <properties>
     <property name="spawn" type="int" value="2"/>
     <property name="targetmap" value="MF_LivingRoom.tmx"/>
    </properties>
   </object>
  </objectgroup>
 </tile>
 <tile id="76">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="89">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="109">
  <objectgroup draworder="index" id="2">
   <object id="1" name="Spawn Entrance 3" type="Spawn" x="0" y="0" width="16" height="16">
    <properties>
     <property name="id" type="int" value="3"/>
    </properties>
   </object>
  </objectgroup>
 </tile>
 <tile id="110">
  <objectgroup draworder="index" id="2">
   <object id="1" name="DiningRoom Exit" type="Exit" x="0" y="0" width="16" height="16">
    <properties>
     <property name="spawn" type="int" value="3"/>
     <property name="targetmap" value="MF_DiningRoom.tmx"/>
    </properties>
   </object>
  </objectgroup>
 </tile>
 <tile id="113">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="115">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="116">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="117">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="118">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="119">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="120">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="121">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="122">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="123">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="124">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="126">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="128">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="129">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="130">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="131">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="132">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="133">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="134">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="135">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="136">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="137">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="150">
  <objectgroup draworder="index" id="3">
   <object id="2" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="4" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="152">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="153">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="154">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="155">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="156">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="157">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="158">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="159">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="160">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="161">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="163">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="165">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="166">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="167">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="168">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="169">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="170">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="171">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="172">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="173">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="174">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="187">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="189">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="190">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="191">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="192">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="193">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="194">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="195">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="196">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="197">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="198">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="200">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="202">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="203">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="204">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="205">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="206">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="207">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="208">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="209">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="210">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="211">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="224">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="226">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="227">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="228">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="229">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="230">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="231">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="232">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="233">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="234">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="235">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="237">
  <objectgroup draworder="index" id="3">
   <object id="2" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="4" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="239">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="240">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="241">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="242">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="243">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="244">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="245">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="246">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="247">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="248">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="261">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="274">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="300">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="301">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="302">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="303">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="304">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="305">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="306">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="307">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="308">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="309">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
   <object id="2" type="Occluder" x="0" y="0" width="16" height="16"/>
   <object id="3" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="374">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="375">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="376">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="377">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="378">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="379">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="380">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="381">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="382">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="383">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="387">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="388">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="389">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="390">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="391">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="392">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="393">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="394">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="395">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="396">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="411">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="420">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="424">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="425">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="426">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="427">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="428">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="429">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="430">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="431">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="432">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="433">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="448">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="457">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="461">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="462">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="463">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="464">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="465">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="466">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="467">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="468">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="469">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="470">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="485">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="486">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="487">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="488">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="489">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="490">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="491">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="492">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="493">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="494">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="498">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="499">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="500">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="501">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="502">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="503">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="504">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="505">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="506">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="507">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="559">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="560">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="561">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="562">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="563">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="564">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="565">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="566">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="567">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="568">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="572">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="573">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="574">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="575">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="576">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="577">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="578">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="579">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="580">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="581">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Blocker" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="596">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="597">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="598">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="599">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="600">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="601">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="602">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="603">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="604">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="605">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="609">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="610">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="611">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="612">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="613">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="614">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="615">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="616">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="617">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="618">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="633">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="634">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="635">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="636">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="637">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="638">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="639">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="640">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="641">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="642">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="646">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="647">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="648">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="649">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="650">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="651">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="652">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="653">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="654">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="655">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="16"/>
  </objectgroup>
 </tile>
 <tile id="670">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="671">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="672">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="673">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="674">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="675">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="676">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="677">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="678">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="679">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="683">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="684">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="685">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="686">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="687">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="688">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="689">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="690">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="691">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="692">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="718">
  <properties>
   <property name="color" value="255,3,57"/>
   <property name="direction" value="1,0"/>
   <property name="half-angle" value="3.141592653589793"/>
   <property name="radius" value="200"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" type="Light Source" x="3" y="12" width="10" height="4">
    <properties>
     <property name="color" value="255,255,255"/>
     <property name="direction" value="1,0"/>
     <property name="half-angle" value="3.141592653589793"/>
     <property name="radius" value="200"/>
    </properties>
   </object>
  </objectgroup>
 </tile>
 <tile id="744">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="7" width="16" height="9"/>
  </objectgroup>
 </tile>
 <tile id="745">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="7" width="16" height="9"/>
  </objectgroup>
 </tile>
 <tile id="754">
  <objectgroup draworder="index" id="3">
   <object id="2" type="Light Source" x="3" y="3">
    <properties>
     <property name="color" value="255,3,57"/>
     <property name="direction" value="1,0"/>
     <property name="half-angle" value="3.141592653589793"/>
     <property name="radius" value="200"/>
    </properties>
    <polygon points="0,0 9.95652,-0.0434783 9.95652,3.91304 -0.0434783,3.95652"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="781">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="9"/>
   <object id="2" type="Occluder" x="0" y="2" width="16" height="14"/>
  </objectgroup>
 </tile>
 <tile id="782">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="9"/>
   <object id="2" type="Occluder" x="0" y="2" width="16" height="14"/>
  </objectgroup>
 </tile>
 <tile id="858">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="3" y="9" width="13" height="7"/>
  </objectgroup>
 </tile>
 <tile id="859">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="9" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="860">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="9" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="861">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="9" width="13" height="7"/>
  </objectgroup>
 </tile>
 <tile id="868">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="3" y="9" width="13" height="7"/>
  </objectgroup>
 </tile>
 <tile id="869">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="9" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="870">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="9" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="871">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="9" width="13" height="7"/>
  </objectgroup>
 </tile>
 <tile id="872">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="3" y="9" width="13" height="7"/>
  </objectgroup>
 </tile>
 <tile id="873">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="9" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="874">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="9" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="875">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="9" width="13" height="7"/>
  </objectgroup>
 </tile>
 <tile id="895">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="4" y="0" width="12" height="14"/>
   <object id="2" type="Collider" x="4" y="0" width="12" height="7"/>
  </objectgroup>
 </tile>
 <tile id="896">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="0" y="0" width="16" height="14"/>
   <object id="2" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="897">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="0" y="0" width="16" height="14"/>
   <object id="2" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="898">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="0" y="0" width="12" height="14"/>
   <object id="2" type="Collider" x="0" y="0" width="12" height="7"/>
  </objectgroup>
 </tile>
 <tile id="903">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="9"/>
   <object id="2" type="Occluder" x="0" y="9" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="904">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="9"/>
   <object id="2" type="Occluder" x="0" y="9" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="905">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="4" y="0" width="12" height="14"/>
   <object id="2" type="Collider" x="4" y="0" width="12" height="7"/>
  </objectgroup>
 </tile>
 <tile id="906">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="0" y="0" width="16" height="14"/>
   <object id="2" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="907">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="0" y="0" width="16" height="14"/>
   <object id="2" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="908">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="0" y="0" width="12" height="14"/>
   <object id="2" type="Collider" x="0" y="0" width="12" height="7"/>
  </objectgroup>
 </tile>
 <tile id="909">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="4" y="0" width="12" height="14"/>
   <object id="2" type="Collider" x="4" y="0" width="12" height="7"/>
  </objectgroup>
 </tile>
 <tile id="910">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="0" y="0" width="16" height="14"/>
   <object id="2" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="911">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
   <object id="2" type="Occluder" x="0" y="0" width="16" height="14"/>
  </objectgroup>
 </tile>
 <tile id="912">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="12" height="7"/>
   <object id="2" type="Occluder" x="0" y="0" width="12" height="14"/>
  </objectgroup>
 </tile>
 <tile id="913">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="914">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="915">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="916">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="0" width="16" height="7"/>
  </objectgroup>
 </tile>
 <tile id="934">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="2" y="14" width="14" height="2"/>
  </objectgroup>
 </tile>
 <tile id="935">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Collider" x="0" y="14" width="14" height="2"/>
  </objectgroup>
 </tile>
 <tile id="969">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="2" y="8" width="10" height="7.95652"/>
   <object id="2" type="Collider" x="2" y="8" width="10" height="6"/>
   <object id="3" type="Occluder" x="7" y="3.7" width="8" height="4.25"/>
   <object id="4" type="Collider" x="7" y="2" width="8" height="4"/>
  </objectgroup>
 </tile>
 <tile id="970">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="2" y="9" width="11" height="6"/>
   <object id="2" type="Collider" x="2" y="5.6" width="11" height="6.30435"/>
  </objectgroup>
 </tile>
 <tile id="971">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="2" y="2" width="14" height="12"/>
   <object id="2" type="Collider" x="2" y="0" width="14" height="7"/>
  </objectgroup>
 </tile>
 <tile id="972">
  <objectgroup draworder="index" id="2">
   <object id="1" type="Occluder" x="0" y="2" width="14" height="12"/>
   <object id="2" type="Collider" x="0" y="0" width="14" height="7"/>
  </objectgroup>
 </tile>
</tileset>
