package com.bayerbbs.applrepos.hibernate;

import java.net.URL;
import java.util.Iterator;

import javax.xml.namespace.QName;
import javax.xml.rpc.Service;
import javax.xml.rpc.ServiceFactory;

public class TestAir {

	public static void main(String[] args) throws Exception {
		int[][] data = {{3}, {1, 2}}; 
		String namespace = "http://service.applrepos.bayerbbs.com/";
		String portName = "ProductWSPort";
		QName portQN = new QName(namespace, portName);
		
		String wsdlURL = "http://localhost:8080/AIR/ProductWSPort?wsdl";
		String serviceName = "ProductWSService";
		QName serviceQN = new QName(namespace, serviceName);
		ServiceFactory serviceFactory = ServiceFactory.newInstance();
		 // The "new URL(wsdlURL)" parameter is optional 
		Service service = serviceFactory.createService(new URL(wsdlURL), serviceQN);
		System.out.println("service === "+service);
		
		Iterator myProxy = service.getPorts();
		
		while(myProxy.hasNext())
		{
			System.out.println(myProxy.next());
		}
		
//		ProductWSDelegate delegate = new ProductWSDelegate();
		
//		System.out.println("Size ===== "+myProxy.findManufacturerList().length);

	}

}
