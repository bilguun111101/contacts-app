import alphabet from "./alphabet.json";
import { group, content } from "./type";
import * as Contacts from "expo-contacts";
import React, { useEffect, useState } from 'react';
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView, StyleSheet, View, Text, Image, ScrollView } from "react-native";


export const SecondHome = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if(!(status === 'granted')) {
        alert("Permission denied!!!");
        return;
      }
      const { data } = await Contacts.getContactsAsync({
        fields: [ Contacts.Fields.Name, Contacts.Fields.ID, Contacts.Fields.PhoneNumbers, Contacts.Fields.Birthday ]
      });
      if(!data.length) {
        alert("No contacts found");
        return;
      }
      setContacts(data);
    })()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
          alphabet?.map((el, idx) => {
            const contacts_information = contacts.filter((element, index) => element.firstName.slice(0, 1) === el);
            return (
              <>
                {
                  (contacts_information.length !== 0) 
                    &&
                  (
                    <FlashList
                        data={contacts_information}
                        renderItem={({ item }) => {
                            return <Group contact={item.phoneNumbers} letter={el} />
                        }}
                    />
                  )
                }
              </>
            )
          })
        }
      </ScrollView>
    </SafeAreaView>
  )
}


const Group = ({ contact, letter }: group) => {
    return (
        <View style={styles.content}>
            <View style={{ ...styles.column }}>
            <Text style={{ ...styles.phoneNumber, fontSize: 20 }}>{letter}</Text>
            </View>
            <View style={styles.contacts}>
            {
                <FlashList 
                    data={contact}
                    renderItem={({ item }) => {
                        return <Content contact={item} />
                    }}
                />
            }
            </View>
        </View>
    )
}

const Content = ({ contact }: content) => {
  const { number } = contact;
  return (
    <View style={{ ...styles.column, ...styles.contact }}>
      <View style={{ ...styles.column, borderBottomWidth: 0.2, paddingHorizontal: 0, paddingVertical: 10 }}>
        <Image source={require("../../../assets/icon.png")} style={styles.image} />
        <Text style={styles.phoneNumber}>{number}</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 13,
  },
  column: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    backgroundColor: 'silver',
  },
  contact: { },
  contacts: {
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  image: {
    width: 40,  
    height: 40,
    borderRadius: 50,
    borderWidth: 0.3,
  },
  phoneNumber: {
    marginLeft: 10,
    fontSize: 16, 
    fontWeight: '500'
  },
})
